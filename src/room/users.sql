-- name: get-user
-- Gets a user by id
SELECT id, name, email, password
FROM users
WHERE id = :id

-- name: get-users
-- Gets all users
SELECT name, email
FROM users

-- name: get-user-by-name
-- Gets a user by id
SELECT *
FROM users
WHERE name = :name

-- name: update-user-chats!
UPDATE users
SET chats = :chats
WHERE id = :id

-- name: update-user-friends!
UPDATE users
SET friends = :friends
WHERE id = :id

-- name: create-users-table!
-- Creates the table for users
CREATE TABLE users (
id SERIAL,
name text,
email text,
password text,
chats text[],
friends integer[]
PRIMARY KEY(id),
UNIQUE(name)
)

