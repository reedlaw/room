-- name: get-messages
-- Gets all messages
SELECT messages.id, text, room, name, email, author_id, created_at
FROM messages
INNER JOIN users ON author_id = users.id

-- name: get-rooms
-- Gets all room names
SELECT DISTINCT room
FROM messages

-- name: get-messages-by-room
-- Gets all messages by room
SELECT text, room, name
FROM messages
INNER JOIN users ON author_id = users.id
WHERE room = :room

-- name: create-message<!
INSERT INTO messages ( text, room, author_id, created_at ) VALUES ( :text, :room, :authorid, now() )

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
room text,
author_id integer,
created_at timestamp,
updated_at timestamp,
PRIMARY KEY(id)
)
