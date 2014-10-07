-- name: get-messages
-- Gets all messages
SELECT messages.id, text, chat, name, email, author_id, created_at
FROM messages
INNER JOIN users ON author_id = users.id

-- name: get-chats
-- Gets all chat names
SELECT DISTINCT chat
FROM messages

-- name: get-messages-by-chat
-- Gets all messages by chat
SELECT text, chat, name
FROM messages
INNER JOIN users ON author_id = users.id
WHERE chat = :chat

-- name: create-message<!
INSERT INTO messages ( text, chat, author_id, created_at ) VALUES ( :text, :chat, :authorid, now() )

-- name: update-message!
UPDATE messages
SET text = :text
WHERE id = :id

-- name: delete-message!
DELETE FROM messages
WHERE id = :id

-- name: create-messages-table!
-- Creates the table for messages
CREATE TABLE messages (
id SERIAL,
text text,
chat text,
author_id integer,
created_at timestamp,
updated_at timestamp,
PRIMARY KEY(id)
)
