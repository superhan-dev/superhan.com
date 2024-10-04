CREATE TABLE `user` (
  `id` integer PRIMARY KEY,
  `username` varchar(50) NOT NULL,
  `login_type` varchar(10) NOT NULL
);

CREATE TABLE `profile` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `nickname` varchar(12),
  `image_url` varchar(100),
  `join_date` timestamp NOT NULL,
  `update_date` timestamp NOT NULL
);

CREATE TABLE `hash_password` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `password` BINARY(64),
  `salt` BINARY(64),
  `update_date` timestamp NOT NULL
);

CREATE TABLE `social` (
  `id` integer PRIMARY KEY,
  `user_id` integer,
  `password` varchar(128),
  `update_date` timestamp NOT NULL
);

CREATE TABLE `token` (
  `id` integer PRIMARY KEY,
  `access_token` varchar(50) NOT NULL,
  `update_date` timestamp NOT NULL,
  `expire_date` timestamp NOT NULL
);

CREATE TABLE `project` (
  `id` integer PRIMARY KEY,
  `name` varchar(20) NOT NULL
);

CREATE TABLE `role` (
  `id` integer PRIMARY KEY,
  `role_name` varchar(10),
  `readable` tinyint NOT NULL,
  `writable` tinyint NOT NULL,
  `updatable` tinyint NOT NULL,
  `deletable` tinyint NOT NULL,
  `creatable` tinyint NOT NULL
);

CREATE TABLE `user_project_role` (
  `id` integer PRIMARY KEY,
  `role_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `user_id` integer NOT NULL
);

CREATE TABLE `withdrawal_user` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `withdrawal_date` timestamp NOT NULL
);

CREATE TABLE `login_log` (
  `id` integer PRIMARY KEY,
  `user_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `status_code` varchar(10) NOT NULL,
  `ip` varchar(15),
  `reason` varchar(10)
);

-- ALTER TABLE `hash_password` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- ALTER TABLE `user_project_role` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- ALTER TABLE `user_project_role` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

-- ALTER TABLE `user_project_role` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

-- ALTER TABLE `profile` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- ALTER TABLE `login_log` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

-- ALTER TABLE `login_log` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- ALTER TABLE `withdrawal_user` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
