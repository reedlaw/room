(defproject room "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :cljsbuild
  {:builds
   [{:source-paths ["src-cljs"]
     :compiler {:output-dir "resources/public/js/"
                :optimizations :none
                :output-to "resources/public/js/app.js"
                :source-map true
                :pretty-print true}}]}
  :main room.core
  :plugins [[lein-ring "0.8.11"]
            [lein-environ "0.5.0"]
            [lein-ancient "0.5.5"]
            [lein-cljsbuild "1.0.3"]
            [com.cemerick/austin "0.1.5"]]
  :ring {:handler room.core/start!
         :auto-reload? true
         :auto-refresh? true}
  :dependencies [[org.clojure/clojure "1.6.0"]
                 [org.clojure/data.json "0.2.5"]
                 [org.clojure/java.jdbc "0.3.5"]
                 [org.clojure/core.async "0.1.338.0-5c5012-alpha"]
                 [org.clojure/clojurescript "0.0-2356"]
                 [com.taoensso/sente "1.1.0"]
                 [com.taoensso/timbre "3.3.1"]
                 [cider/cider-nrepl "0.7.0"]
                 [buddy "0.2.0b2"]
                 [hiccup "1.0.5"]
                 [http-kit "2.1.19"]
                 [compojure "1.2.0"]
                 [reagent "0.4.2"]
                 [ring "1.3.1"]
                 [ring/ring-defaults "0.1.2"]
                 [ring/ring-devel "1.3.1"]
                 [ring/ring-anti-forgery "1.0.0"]
                 [markdown-clj "0.9.54"]
                 [secretary "1.2.1"]
                 [yesql "0.4.0"]
                 [org.postgresql/postgresql "9.3-1102-jdbc41"]])
