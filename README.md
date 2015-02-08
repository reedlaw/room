# room

Room is a chat server with a web client frontend. It uses [Sente](https://github.com/ptaoussanis/sente) for realtime channel sockets, [Reagent](https://github.com/reagent-project/reagent) to leverage React.js from Clojurescript, and [Yesql](https://github.com/krisajenkins/yesql) for storage.

![Screenshot](https://github.com/reed/room/raw/master/doc/room.png)

## Usage

1. Create a PostgreSQL database
2. Configure the db connection in `src/room/core.clj`
3. In a `lein repl`:
```
(create-users-table!)
(create-topics-table!)
(create-subscriptions-table!)
(create-messages-table!)
```
4. `lein run server`
5. Open http://localhost:8000
