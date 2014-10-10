-- name: get-messages
-- Gets all messages
SELECT messages.id, text, topics.name AS topic, topic_id, users.name AS author, email, author_id, messages.created_at, messages.updated_at
FROM messages
INNER JOIN users ON author_id = users.id
INNER JOIN topics ON topic_id = topics.id

-- name: create-message<!
INSERT INTO messages ( text, topic_id, author_id, created_at ) VALUES ( :text, :topicid, :authorid, now() )

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
topic_id integer,
author_id integer,
created_at timestamp,
updated_at timestamp,
PRIMARY KEY(id)
)
