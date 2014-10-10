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
-- Gets a user by name
SELECT *
FROM users
WHERE name = :name

-- name: get-user-by-email
-- Gets a user by email
SELECT *
FROM users
WHERE email = :email

-- name: update-user-friends!
UPDATE users
SET friends = :friends
WHERE id = :id

-- name: create-user<!
INSERT INTO users ( name, email, password ) VALUES ( :name, :email, :password )

-- name: create-users-table!
-- Creates the table for users
CREATE TABLE users (
id SERIAL,
name text,
email text,
password text,
PRIMARY KEY(id)
)

