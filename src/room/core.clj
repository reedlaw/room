(ns room.core
  (:require
   [compojure.core :as comp :refer (defroutes GET POST ANY)]
   [compojure.route :as route]
   [hiccup.core :as hiccup]
   [ring.middleware.session :refer [wrap-session]]
   [ring.middleware.params :refer [wrap-params]]
   [ring.util.response :refer [response redirect content-type]]
   [org.httpkit.server :as http-kit-server]
   [clojure.core.async :as async :refer (<! <!! >! >!! put! chan go go-loop)]
   [taoensso.sente :as sente]
   [taoensso.timbre :as timbre]
   [ring.middleware.anti-forgery :as ring-anti-forgery :refer (wrap-anti-forgery)]
   [ring.util.anti-forgery :refer (anti-forgery-field)]
   [clojure.tools.nrepl.server :as nrepl-server]
   [cider.nrepl :refer (cider-nrepl-handler)]
   [buddy.auth :refer (authenticated?)]
   [buddy.auth.backends.session :refer [session-backend]]
   [buddy.auth.middleware :refer [wrap-authentication]]
   [buddy.hashers.bcrypt :as hs]))

(defn- logf [fmt & xs] (println (apply format fmt xs)))

(def users {"reed" {:username "reed"
                    :password (hs/make-password "password")
                    :roles #{::admin}}
            "winnie" {:username "winnie"
                    :password (hs/make-password "password")
                    :roles #{::user}}})

(def backend (session-backend))

(let [{:keys [ch-recv send-fn ajax-post-fn ajax-get-or-ws-handshake-fn
              connected-uids]}
      (sente/make-channel-socket! {})]
  (def ring-ajax-post                ajax-post-fn)
  (def ring-ajax-get-or-ws-handshake ajax-get-or-ws-handshake-fn)
  (def ch-chsk                       ch-recv) ; ChannelSocket's receive channel
  (def chsk-send!                    send-fn) ; ChannelSocket's send API fn
  (def connected-uids                connected-uids) ; Watchable, read-only atom
  )

(defn landing-pg-handler [req]
  (if (authenticated? req)
    (hiccup/html
     [:div
      [:a {:href "/logout"} "Welcome "(get-in req [:session :identity]) " -- logout"]]
     [:div {:id "app"}]
     [:script {:src "/js/jquery.js"}]
     [:script {:src "/js/react.js"}]
     [:script {:src "/js/goog/base.js"}]
     [:script {:src "/js/app.js"}]
     [:script "goog.require('room.core')"])
    (hiccup/html
     [:div
      [:a {:href "/login"} "login"]]
     [:div {:id "app"}]
     [:script {:src "/js/jquery.js"}]
     [:script {:src "/js/react.js"}]
     [:script {:src "/js/goog/base.js"}]
     [:script {:src "/js/app.js"}]
     [:script "goog.require('room.core')"])))

(defn login-ctrl
  [request]
  (cond
   (= (:request-method request) :get)
   (hiccup/html
    [:div
     [:form {:action "/login"
             :method "post"}
      (anti-forgery-field)
      [:input {:name "username"
               :type "text"}]
      [:input {:name "password"
               :type "text"}]
     [:button {:type "submit"}
      "Login"]]])
   (= (:request-method request) :post)
   (let [username (get-in request [:form-params "username"])
         password (get-in request [:form-params "password"])
         session (-> (:session request)
                     (assoc :identity (keyword username)))]
     (if (and (contains? users username)
              (hs/check-password password (get-in users [username :password])))
       (-> (redirect (get-in request [:query-params :next] "/"))
           (assoc :session session))
       (hiccup/html
        [:div
         "Not authorized"])))))

(defn logout-ctrl
  [request]
  (-> (redirect "/login")
      (assoc :session {})))

(defroutes app
  (GET  "/"      req (landing-pg-handler req))
  (ANY "/login" [] login-ctrl)
  (GET  "/chsk"  req (ring-ajax-get-or-ws-handshake req))
  (POST "/chsk"  req (ring-ajax-post                req))
  (GET "/logout" [] logout-ctrl)
  (route/resources "/") ; Static files, notably public/main.js (our cljs target)
  (route/not-found "<h1>Page not found</h1>"))

(defn wrap-nocache [handler]
  (fn [request]
     (let [response (handler request)]
        (assoc-in response [:headers  "Pragma"] "no-cache"))))

(def handler
    (-> app
        (wrap-authentication backend)
        (wrap-params)
        (wrap-session)))

(defmulti event-msg-handler :id) ; Dispatch on event-id
;; Wrap for logging, catching, etc.:
(defn     event-msg-handler* [{:as ev-msg :keys [id ?data event]}]
  (logf "Event: %s" event)
  (event-msg-handler ev-msg))

(do ; Server-side methods
  (defmethod event-msg-handler :default ; Fallback
    [{:as ev-msg :keys [event id ?data ring-req ?reply-fn send-fn]}]
    (let [session (:session ring-req)
          uid     (:uid     session)]
      (logf "Unhandled event: %s" event)
      (when-not (:dummy-reply-fn (meta ?reply-fn))
        (?reply-fn {:umatched-event-as-echoed-from-from-server event}))))

  ;; Add your (defmethod event-msg-handler <event-id> [ev-msg] <body>)s here...
  (defmethod event-msg-handler :room/req
    [{:as ev-msg :keys [event id ?date ring-req ?reply-fn send-fn]}]
    (chsk-send! nil [:chat/broadcast {:message (last event)}]))
  )

(defonce http-server_ (atom nil))

(defn stop-http-server! []
  (when-let [stop-f @http-server_]
    (stop-f :timeout 100)))

(defn start-http-server! []
  (stop-http-server!)
  (let [s   (http-kit-server/run-server (var handler) {:port 8000})
        uri (format "http://localhost:%s/" (:local-port (meta s)))]
    (reset! http-server_ s)))

(defonce router_ (atom nil))

(defn  stop-router! [] (when-let [stop-f @router_] (stop-f)))
(defn start-router! []
  (stop-router!)
  (reset! router_ (sente/start-chsk-router! ch-chsk event-msg-handler*)))

(defn start! []
  (start-router!)
  (start-http-server!))

(defn -main [&args]
  (nrepl-server/start-server :port 7888 :handler cider-nrepl-handler)
  (start!))

