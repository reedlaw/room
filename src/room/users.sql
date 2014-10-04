-- name: get-user
-- Gets a user by id
SELECT *
FROM users
WHERE id = :id

-- name: get-user-by-name
-- Gets a user by id
SELECT *
FROM users
WHERE name = :name

-- name: create-users-table!
-- Creates the table for users
CREATE TABLE users (
id SERIAL,
name text,
email text,
password text,
PRIMARY KEY(id),
UNIQUE(name)
)

