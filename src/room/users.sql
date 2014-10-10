-- name: get-user
-- Gets a user by id
SELECT id, name, email, password, topics
FROM users
WHERE id = :id

-- name: get-users
-- Gets all users
SELECT name, email
FROM users

-- name: get-topics
-- Gets all topic names and users count
SELECT name, COUNT(id) AS users FROM (SELECT unnest(topics) AS name, id FROM users) totals GROUP BY totals.name ORDER BY name asc;

-- name: get-user-by-name
-- Gets a user by name
SELECT *
FROM users
WHERE name = :name

-- name: get-user-by-email
-- Gets a user by email
SELECT *
FROM users
WHERE email = :email

-- name: update-user-add-topic!
UPDATE users
SET topics = array_append(topics, CAST(:topic AS text))
WHERE id = :id

-- name: update-user-leave-topic!
UPDATE users
SET topics = array_remove(topics, CAST(:topic AS text))
WHERE id = :id

-- name: update-user-friends!
UPDATE users
SET friends = :friends
WHERE id = :id

-- name: create-user<!
INSERT INTO users ( name, email, password, topics ) VALUES ( :name, :email, :password, '{general,random}' );

-- name: create-users-table!
-- Creates the table for users
CREATE TABLE users (
id SERIAL,
name text,
email text,
password text,
topics text[],
friends integer[],
PRIMARY KEY(id),
UNIQUE(name)
)

