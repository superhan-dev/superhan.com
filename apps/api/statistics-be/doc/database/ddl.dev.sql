CREATE TABLE es_account_dev.`account` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50) NOT NULL,
  `project_id` integer NOT NULL,
  `login_type` varchar(10) NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account_dev.`hash_password` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `account_id` integer,
  `password` VARCHAR(128),
  `salt` VARCHAR(32),
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account_dev.`project` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `project_name` varchar(20) NOT NULL,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account_dev.`role` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `role_name` varchar(10),
  `readable` tinyint NOT NULL DEFAULT 0,
  `writable` tinyint NOT NULL DEFAULT 0,
  `creatable` tinyint NOT NULL DEFAULT 0,
  `updatable` tinyint NOT NULL DEFAULT 0,
  `deletable` tinyint NOT NULL DEFAULT 0,
  `is_deleted` tinyint NOT NULL DEFAULT 0,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account_dev.`account_role` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `role_id` integer NOT NULL,
  `account_id` integer NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE es_account_dev.`withdrawal_account` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `account_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `withdrawal_date` timestamp NOT NULL
);

CREATE TABLE es_account_dev.`login_log` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `account_id` integer NOT NULL,
  `project_id` integer NOT NULL,
  `status_code` varchar(10) NOT NULL,
  `ip` varchar(15),
  `reason` varchar(10),
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `update_date` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX `account_index_0` ON es_account_dev.`account` (`id`, `project_id`);

CREATE UNIQUE INDEX `account_role_index_1` ON es_account_dev.`account_role` (`account_id`, `role_id`);
