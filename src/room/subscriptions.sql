-- name: get-subscriptions
select name from subscriptions inner join topics on topics.id=subscriptions.topic_id where user_id = :userid

-- name: join-topic!
INSERT INTO subscriptions ( user_id, topic_id, created_at )
VALUES ( :userid, :topicid, now() )

-- name: leave-topic!
DELETE FROM subscriptions WHERE user_id = :userid AND topic_id = :topicid

-- name: create-subscriptions-table!
CREATE TABLE subscriptions (
user_id int not null,
topic_id int not null,
created_at timestamp,
constraint subscriptions_pkey primary key(user_id,topic_id)
)

