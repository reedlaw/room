(ns room.chats
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

(def chats (atom ((js->clj (.-user js/window)) "chats")))

(def users (atom (js->clj (.-users js/window))))

(defn join-chat [chat]
  (secretary/dispatch! (str "/chats/" chat)))

(defn add-chat [chat]
  (join-chat chat)
  (if-not (some #(= chat %) @chats)
    (do
      (swap! chats conj chat)
      (chsk-send! [:chat/join chat]))))

(defn notify-new-message [chat]
  )

(defn chat-input []
  (let [editing (atom false)]
    (fn [props]
      (if @editing
        (let [val (atom "")
              stop #(do (reset! val "")
                        (reset! editing false))
              save #(let [v (-> @val str clojure.string/trim)]
                      (if-not (empty? v) (add-chat v))
                      (stop))]
          [:input {:type "text"
                   :on-change #(reset! val (-> % .-target .-value))
                   :on-key-up #(case (.-which %)
                                 13 (save)
                                 27 (stop)
                                 nil)}])
        [:li {:on-click #(reset! editing true)}
         [:i.fa-li.fa.fa-plus-square-o]
         "Start a new chat"]))))

(def chat-input-box (with-meta chat-input
                      {:component-did-update #(.focus (reagent/dom-node %))}))

(defn chat-list [cur]
  [:div#chats
   [:h2
    [:i.fa.fa-users] "Topics"]
   [:ul.fa-ul
    (for [chat @chats]
      [:li {:class (if (= chat cur) "current")
            :key chat
            :on-click #(join-chat chat)}
       [:i.fa-li.fa.fa-check-square-o]
       chat])
    [chat-input-box]]
   [:h2
    [:i.fa.fa-user] "People"]
   [:ul.fa-ul
    (for [user @users]
      [:li {:key user} (user "name")
       [:i.fa-li.fa.fa-square-o]])]])
