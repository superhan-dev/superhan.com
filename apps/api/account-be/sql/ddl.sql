CREATE TABLE `user` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `login_type` varchar(10) NULL
);


CREATE TABLE `hash_password` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer,
  `password` varchar(128),
  `salt` varchar(32),
`update_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE `project` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) UNIQUE NOT NULL,
);

CREATE TABLE `role` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `role_name` varchar(10) UNIQUE NOT NULL,
  `readable` tinyint NOT NULL,
  `writable` tinyint NOT NULL,
  `updatable` tinyint NOT NULL,
  `deletable` tinyint NOT NULL,
  `creatable` tinyint NOT NULL
);

CREATE TABLE `user_project_role` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `role_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `user_id` integer NOT NULL
);

CREATE TABLE `withdrawal_user` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `withdrawal_date` timestamp NOT NULL
);

CREATE TABLE `login_log` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `status_code` varchar(10) NOT NULL,
  `ip` varchar(15),
  `reason` varchar(10)
);

-- ALTER TABLE `user_project_role` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

-- ALTER TABLE `user_project_role` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

-- ALTER TABLE `login_log` ADD FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);

-- ALTER TABLE `login_log` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);
