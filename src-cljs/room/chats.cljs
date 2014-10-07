(ns room.chats
  (:require [secretary.core :as secretary :include-macros true :refer [defroute dispatch!]]
            [reagent.core :as reagent :refer [atom]]
            [taoensso.encore :as encore :refer (logf)]))

(def chats (atom (js->clj (.-chats js/window))))

(defn join-chat [chat]
  (secretary/dispatch! (str "/chats/" chat)))

(defn add-chat [chat]
  (if (some #(= {"chat" chat} %) @chats)
    (join-chat {"chat" chat})
    (swap! chats conj {"chat" chat})))

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
   [:h2 "Chats"]
   [:ul.fa-ul
    (for [chat @chats]
      [:li {:class (if (= chat cur) "current")
            :key chat
            :on-click #(join-chat chat)}
       [:i.fa-li.fa.fa-check-square-o]
       chat])
    [chat-input-box]]])
