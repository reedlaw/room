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
(def messages (js->clj (.-messages js/window)))

(def rooms (js->clj (.-rooms js/window)))

(def msgs (atom (sorted-map)))

(def rms (atom (sorted-map)))

(def message-counter (atom 0))

(defn add-message [author text time]
  (let [id (swap! message-counter inc)]
    (swap! msgs assoc id {:id id :author author :text text :time time})))

(doseq [m messages]
  (let [author {:name (get m "name")
                :email (get m "email")
                :hash (get m "hash")
                :id (get m "id")}]
    (add-message author (get m "text") (get m "created_at"))))

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
    (let [d (last ?data)
          msg (:message d)
          uid (:uid d)
          author {:name (:name d)
                  :email (:email d)
                  :hash (:hash d)
                  :id uid}]
      (add-message author msg (js/moment)))))

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
      [:input {:id "message-input"
               :placeholder "Message"
               :type "text"
               :value @val
               :on-key-up #(case (.-which %)
                             13 (save)
                             27 (stop)
                             nil)
               :on-change #(reset! val (-> % .-target .-value))}])))

(defn message-list [{:keys [messages]}]
  (fn [props]
    [:ul#message-list
     (for [message (vals @msgs)]
       (let [author (:author message)
             id (:id message)]
         [:div.message {:key id}
          [:a.avatar {:href (:name author)}
           [:img {:src (str "http://www.gravatar.com/avatar/" (:hash author) "?s=30")}]]
          [:div.message-body
           [:a.username {:href (:name author)} (:name author)]
           [:span.time (.format (.local (.utc js/moment (:time message))) "h:mm a")]
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

(defn home []
  (let [filt (atom :all)]
    (fn []
      (let [messages (vals @msgs)]
        (do
          [:div#content
           [:div#body
            [message-box {:messages messages}]]
           [:div#footer
            [:div {:id "message"}
             [message-input {:on-save send-message}]]]])))))

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
