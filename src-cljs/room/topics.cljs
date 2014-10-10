(ns room.topics
  (:require [secretary.core :as secretary :include-macros true :refer [defroute dispatch!]]
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

(def topics (atom (js->clj (.-topics js/window))))

(def users (atom (js->clj (.-users js/window))))

(defn join-topic [topic]
  (secretary/dispatch! (str "/topics/" topic)))

(defn add-topic [topic]
  (if-not (some #(= topic %) @topics)
    (do
      (swap! topics conj topic)
      (chsk-send! [:topic/join topic]))))

(defn leave-topic [topic cur]
  (swap! topics dissoc topic)
  (chsk-send! [:topic/leave topic])
  (if (= topic cur)
    (join-topic (first @topics))))

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
                      (if-not (empty? v) (add-topic v))
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

(defn topic-list [cur]
  [:div#topics
   [:h2
    [:i.fa.fa-users] "Topics"]
   [:ul.fa-ul
    (for [topic @topics]
      [:li {:class (if (= (topic "name") cur) "current")
            :key topic
            :on-click #(join-topic (topic "name"))}
       [:i.fa-li.fa.fa-check-square-o]
       (topic "name")
       [:i.fa.fa-times-circle {:on-click #(leave-topic (topic "name") cur)}]])
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
       [:span (user "name")]])]])

(defn topic-header [topic]
  [:div#header
   [:i.fa.fa-users]
   (str topic " " ((first (filter #(= topic (% "name")) @topics)) "users"))
   [:i.fa.fa-user]])
