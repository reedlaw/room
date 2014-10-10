-- name: get-topics
-- Gets all topic names and users count
SELECT distinct t1.id, t1.name, array_agg(t1.user) as users from
       (select topics.id, users.name as user, topics.name from topics left outer join subscriptions on topics.id=subscriptions.topic_id left outer join users on subscriptions.user_id=users.id)
as t1 group by t1.name, t1.id;

-- name: create-topic<!
INSERT INTO topics ( name, created_at ) VALUES ( :name, now() )

-- name: create-topics-table!
CREATE TABLE topics (
id SERIAL,
name text,
description text,
private bool default false,
created_at timestamp,
PRIMARY KEY(id)
)
