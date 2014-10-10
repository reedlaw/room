-- name: get-messages
-- Gets all messages
SELECT messages.id, text, topic, name, email, author_id, created_at
FROM messages
INNER JOIN users ON author_id = users.id

-- name: get-messages-by-topic
-- Gets all messages by topic
SELECT text, topic, name
FROM messages
INNER JOIN users ON author_id = users.id
WHERE topic = :topic

-- name: create-message<!
INSERT INTO messages ( text, topic, author_id, created_at ) VALUES ( :text, :topic, :authorid, now() )

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
topic text,
author_id integer,
created_at timestamp,
updated_at timestamp,
PRIMARY KEY(id)
)
