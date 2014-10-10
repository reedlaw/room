(ns room.core
  (:require-macros
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [room.session :as session]
   [room.topics :as topics]
   [reagent.core :as reagent :refer [atom]]
   [secretary.core :as secretary :include-macros true :refer [defroute dispatch!]]
   [cljs.core.async :as async :refer (<! >! put! chan timeout)]
   [taoensso.encore :as encore :refer (logf)]
   [taoensso.sente  :as sente :refer (cb-success?)]
   ))

(let [{:keys [chsk ch-recv send-fn state]}
      (sente/make-channel-socket! "/chsk" ; Note the same path as before
                                  {:type :auto ; e/o #{:auto :ajax :ws}
                                   })]
  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  (def chsk-state state)   ; Watchable, read-only atom
  )

(def messages (atom (sorted-map)))

(defn add-message [id author text time topic-id]
  (swap! messages assoc id {:id id :author author :text text :time time :topic-id topic-id}))

(defn delete-message [id]
  (swap! messages dissoc id))

(doseq [m (js->clj (.-messages js/window))]
  (let [author {:id (get m "author_id")
                :name (get m "author")
                :email (get m "email")
                :hash (get m "hash")
                }
        id (get m "id")]
    (add-message id author (get m "text") (get m "created_at") (get m "topic_id"))))

(defmulti event-msg-handler :id) ; Dispatch on event-id
;; Wrap for logging, catching, etc.:
(defn     event-msg-handler* [{:as ev-msg :keys [?data event]}]
  (let [[id data :as ev] event]
    (logf "Data: %s" data)
    (event-msg-handler ev-msg)))

(do ; Client-side methods
  (defmethod event-msg-handler :default ; Fallback
    [{:as ev-msg :keys [event]}]
    (logf "Unhandled event: %s" event))

  (defmethod event-msg-handler :chsk/state
    [{:as ev-msg :keys [?data]}]
    (if (= ?data {:first-open? true})
      (logf "Channel socket state change: %s" ?data)))

  (defmethod event-msg-handler :chsk/recv
    [{:as ev-msg :keys [?data event]}]
    (let [[id data :as ev] event
          command (first data)
          params (last data)]
      (cond 
       (= command :topic/broadcast) (let [msg-id (:id params)
                                         msg (:message params)
                                         uid (:uid params)
                                         topic-id (:topic-id params)
                                         author {:name (:name params)
                                                 :email (:email params)
                                                 :hash (:hash params)
                                                 :id uid}]
                                (add-message msg-id author msg (js/moment) topic-id))
       (= command :topic/new) (let [id (:id params)
                                    name (:name params)
                                    users (:users params)]
                                (topics/add-topic id name users))
       (= command :message/delete) (delete-message params)))))

(defn send-message [text]
  (chsk-send! [:message/send {:text text :topic (session/get :current-topic-id)}]))

(defn send-delete-message [id]
  (chsk-send! [:message/delete id]))

(defn send-typing []
  (chsk-send! [:user/typing]))

(defn message-input [{:keys [text on-save on-stop]}]
  (let [val (atom text)
        stop #(do (reset! val "")
                  (if on-stop (on-stop)))
        save #(let [v (-> @val str clojure.string/trim)]
                (if-not (empty? v) (on-save v))
                (stop))]
    (fn [props]
      [:input {:id "message-input"
               :placeholder "Message"
               :type "text"
               :value @val
               :on-key-up #(case (.-which %)
                             13 (save)
                             27 (stop)
                             nil)
               :on-change #(reset! val (-> % .-target .-value))}])))

(def message-input-box (with-meta message-input
                         {:component-did-mount #(.focus (reagent/dom-node %))}))

(defn message-list [{:keys [topic-id]}]
  (fn [props]
    [:ul#message-list
     (for [message (filter #(= (:topic-id %) topic-id) (vals @messages))]
       (let [id (:id message)
             author (:author message)]
         [:div.message {:key id}
          [:a.avatar {:href (:name author)}
           [:img {:src (str "//www.gravatar.com/avatar/" (:hash author) "?s=30")}]]
          [:div.message-body
           [:a.username {:href (:name author)} (:name author)]
           [:span.time (.format (.local (.utc js/moment (:time message))) "h:mm a")]
           (if (= ((js->clj (.-user js/window)) "id") (:id author))
             [:i.fa.fa-times {:on-click #(send-delete-message id)}])
           [:span.text {:dangerouslySetInnerHTML {:__html (:text message)}}]]]))]))

(def message-box (with-meta message-list
                   (let [should-scroll (atom false)]
                     (merge
                      {:component-will-update
                       (fn [this new-argv]
                         (let [n (reagent/dom-node this)]
                           (if (identical? (+ (.-offsetHeight n) (.-scrollTop n)) (.-scrollHeight n))
                             (reset! should-scroll true))))}
                      {:component-did-update
                       (fn [this]
                         (when @should-scroll
                           (let [n (reagent/dom-node this)]
                             (set! (.-scrollTop n) (.-scrollHeight n))
                             (reset! should-scroll false))))}
                      {:component-did-mount
                       (fn [this]
                         (let [n (reagent/dom-node this)]
                           (set! (.-scrollTop n) (.-scrollHeight n))
                           (reset! should-scroll false)))}))))

(defn home [topic-id]
  (let [filt (atom :all)]
    (fn []
      (let [user (js->clj (.-user js/window))]
        [:div#app-container
         [:div#nav
          [:div#usermenu
           [:img#userimage {:src (str "//www.gravatar.com/avatar/" (user "hash") "?s=100")}]
           [:span#username (user "name")]
           [:a {:href "/logout"}
            [:i.fa.fa-sign-out]]]
          (topics/topic-list)]
         [:div#content
          (topics/topic-header topic-id)
          [:div#body
           [message-box {:topic-id topic-id}]]
          [:div#footer
           [:div {:id "message"}
            [message-input-box {:on-save send-message}]]]]]))))

(defroute "/" []
  (do
    (session/put! :current-topic-id 2)))

(defroute "/topics/:id" [id]
  (do
    (session/put! :current-topic-id (js/parseInt id))))

(defn page []
  [(home (session/get :current-topic-id))])

(defn ^:export init! []
  (session/put! :current-topic-id 2)
  (sente/start-chsk-router! ch-chsk event-msg-handler*)
  (reagent/render-component [page] (.getElementById js/document "app")))

;;start the app
(init!)
