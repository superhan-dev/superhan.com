CREATE TABLE es_account.`account` (
  `id` integer PRIMARY KEY,
  `username` varchar(50) NOT NULL,
  `project_id` integer NOT NULL,
  `login_type` varchar(10) NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account.`hash_password` (
  `id` integer PRIMARY KEY,
  `account_id` integer,
  `password` BINARY(64),
  `salt` BINARY(64),
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account.`refresh_token` (
  `id` integer PRIMARY KEY,
  `account_id` integer NOT NULL,
  `token` varchar(1024) NOT NULL,
  `login_type` varchar(10) NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account.`project` (
  `id` integer PRIMARY KEY,
  `project_name` varchar(20) NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account.`role` (
  `id` integer PRIMARY KEY,
  `role_name` varchar(10),
  `readable` tinyint NOT NULL,
  `writable` tinyint NOT NULL,
  `creatable` tinyint NOT NULL,
  `updatable` tinyint NOT NULL,
  `deletable` tinyint NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account.`account_role` (
  `id` integer PRIMARY KEY,
  `role_id` integer NOT NULL,
  `account_id` integer NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account.`withdrawal_account` (
  `id` integer PRIMARY KEY,
  `account_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `withdrawal_date` timestamp NOT NULL
);

CREATE TABLE es_account.`login_log` (
  `id` integer PRIMARY KEY,
  `account_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `status_code` varchar(10) NOT NULL,
  `ip` varchar(15),
  `reason` varchar(10),
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX `account_index_0` ON es_account.`account` (`id`, `project_id`);

CREATE UNIQUE INDEX `account_role_index_1` ON es_account.`account_role` (`account_id`, `role_id`);


-- ALTER TABLE `hash_password` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

-- ALTER TABLE `account_role` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

-- ALTER TABLE `account_role` ADD FOREIGN KEY (`role_id`) REFERENCES `role` (`id`);

-- ALTER TABLE `profile` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

-- ALTER TABLE `login_log` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

-- ALTER TABLE `login_log` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

-- ALTER TABLE `withdrawal_account` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);

-- ALTER TABLE `account` ADD FOREIGN KEY (`project_id`) REFERENCES `project` (`id`);

-- ALTER TABLE `refresh_token` ADD FOREIGN KEY (`account_id`) REFERENCES `account` (`id`);
