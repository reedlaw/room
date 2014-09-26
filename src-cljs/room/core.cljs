(ns room.core
  (:require-macros
   [cljs.core.async.macros :as asyncm :refer (go go-loop)])
  (:require
   [reagent.core :as reagent :refer [atom]]
   [secretary.core :as secretary
    :include-macros true :refer [defroute]]
   [cljs.core.async :as async :refer (<! >! put! chan)]
   [taoensso.encore :as encore :refer (logf)]
   [taoensso.sente  :as sente :refer (cb-success?)]
   ))

(logf "ClojureScript appears to have loaded correctly.")

(def state (atom {:doc {} :saved? false}))

(let [{:keys [chsk ch-recv send-fn state]}
      (sente/make-channel-socket! "/chsk" ; Note the same path as before
                                  {:type :auto ; e/o #{:auto :ajax :ws}
                                   })]
  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  (def chsk-state state)   ; Watchable, read-only atom
  )

(def msgs (atom (sorted-map)))

(def counter (atom 0))

(defn add-message [text]
  (let [id (swap! counter inc)]
    (swap! msgs assoc id {:id id :text text})))

(add-message "Test")

(defmulti event-msg-handler :id) ; Dispatch on event-id
;; Wrap for logging, catching, etc.:
(defn     event-msg-handler* [{:as ev-msg :keys [id ?data event]}]
  (logf "Event: %s" event)
  (event-msg-handler ev-msg))

(do ; Client-side methods
  (defmethod event-msg-handler :default ; Fallback
    [{:as ev-msg :keys [event]}]
    (logf "Unhandled event: %s" event))

  (defmethod event-msg-handler :chsk/state
    [{:as ev-msg :keys [?data]}]
    (if (= ?data {:first-open? true})
      (logf "Channel socket successfully established!")
      (logf "Channel socket state change: %s" ?data)))

  (defmethod event-msg-handler :chsk/recv
    [{:as ev-msg :keys [?data]}]
    (let [msg (:text (:message (last ?data)))]
      (add-message msg))))

(defn send-message [text]
  (logf "Sending message: %s" text)
  (chsk-send! [:room/req {:text text}]))

(defn message-input [{:keys [text on-save on-stop]}]
  (let [val (atom text)
        stop #(do (reset! val "")
                  (if on-stop (on-stop)))
        save #(let [v (-> @val str clojure.string/trim)]
                (if-not (empty? v) (on-save v))
                (stop))]
    (fn [props]
      [:div {:id "message"}
       [:input {:id "message-input"
                :placeholder "Message"
                :type "text"
                :value @val
                :on-key-up #(case (.-which %)
                              13 (save)
                              27 (stop)
                              nil)
                :on-change #(reset! val (-> % .-target .-value))}]])))

(defn home []
  (let [filt (atom :all)]
    (fn []
      (let [messages (vals @msgs)]
        [:div
         [:ul#message-list
          (for [message messages]
            (do 
              [:li (:text message)]))]
         [message-input {:on-save send-message}]]))))

(defn page []
  [(:page @state)])

(secretary/set-config! :prefix "#")

(defroute "/" []
          (.log js/console "hi!")
          (swap! state assoc :page home))

(defn init! []
  (swap! state assoc :page home)
  (sente/start-chsk-router! ch-chsk event-msg-handler*)
  (reagent/render-component [page] (.getElementById js/document "app")))

;;start the app
(init!)
