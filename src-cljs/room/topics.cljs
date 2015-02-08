(ns room.topics
  (:require [secretary.core :as secretary :include-macros true :refer [defroute dispatch!]]
            [room.session :as session]
            [reagent.core :as reagent :refer [atom]]
            [taoensso.encore :as encore :refer (logf)]
            [taoensso.sente  :as sente :refer (cb-success?)]))

(let [{:keys [chsk ch-recv send-fn state]}
      (sente/make-channel-socket! "/chsk" ; Note the same path as before
                                  {:type :auto ; e/o #{:auto :ajax :ws}
                                   })]
  (def chsk       chsk)
  (def ch-chsk    ch-recv) ; ChannelSocket's receive channel
  (def chsk-send! send-fn) ; ChannelSocket's send API fn
  (def chsk-state state)   ; Watchable, read-only atom
  )

(def users (atom (js->clj (.-users js/window))))
(def topics (atom (sorted-map)))

(defn add-topic [id name users subscribed?]
  (swap! topics assoc id {:id id :name name :users users :subscribed? subscribed?}))

(doseq [t (js->clj (.-topics js/window))]
  (let [name (get t "name")
        subscribed? (>= (.indexOf (.-subscriptions js/window) name) 0)]
    (add-topic (get t "id") name (get t "users") subscribed?)))

(defn jump-to-topic [id]
  (session/put! :current-topic-id id))

(defn join-topic [id]
  (secretary/dispatch! (str "/topics/" id)))

(defn leave-topic [id]
  (swap! topics dissoc id)
  (chsk-send! [:topic/leave id]))

(defn notify-new-message [topic]
  )

(defn topic-input []
  (let [editing (atom false)]
    (fn [props]
      (if @editing
        (let [val (atom "")
              stop #(do (reset! val "")
                        (reset! editing false))
              save #(let [v (-> @val str clojure.string/trim)]
                      (if-not (empty? v) (chsk-send! [:topic/create v]))
                      (stop))]
          [:input {:type "text"
                   :on-change #(reset! val (-> % .-target .-value))
                   :on-blur stop
                   :on-key-up #(case (.-which %)
                                 13 (save)
                                 27 (stop)
                                 nil)}])
        [:li {:on-click #(reset! editing true)}
         [:i.fa-li.fa.fa-plus-square-o]
         "Start a new topic"]))))

(def topic-input-box (with-meta topic-input
                       {:component-did-update #(.focus (reagent/dom-node %))}))

(defn topic-list []
  (let [id (session/get :current-topic-id)]
    [:div#topics
     [:h2
      [:i.fa.fa-users] "Topics"]
     [:ul.fa-ul
      (doall (for [topic (vals @topics)]
               [:li {:class (str (if (= (:id topic) id) "current")
                                 " "
                                 (if-not (:subscribed? topic) "unsubscribed"))
                     :key (:id topic)
                     :on-click #(join-topic (:id topic))}
                (if (:subscribed? topic)
                  [:i.fa-li.fa.fa-check-square-o]
                  [:i.fa-li.fa.fa-square-o])
                (:name topic)
                (if (:subscribed? topic)
                  [:i.fa.fa-times-circle {:on-click #(leave-topic (:id topic))}])]))
      [:li
       [:i.fa-li.fa.fa-search]
       [:span "More topics"]]
      [topic-input-box]]
     [:h2
      [:i.fa.fa-user] "People"]
     [:ul.fa-ul
      (for [user @users]
        [:li {:key user}
         [:i.fa-li.fa.fa-square-o]
         [:span (user "name")]])]]))

(def topic-box (with-meta topic-list
                 {:component-did-update #(+ 2 2)}))

(defn topic-header [id]
  (let [topic (get @topics id)]
    [:div#header
     [:i.fa.fa-users]
     (:name topic)
     [:span#topic-users
      (str (count (:users topic)))
      [:i.fa.fa-user]
      [:ul#topic-users
       (for [user (:users topic)]
         [:li {:key user}
          user])]]]))
