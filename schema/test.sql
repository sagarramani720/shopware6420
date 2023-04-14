CREATE TABLE `test_demo` (
    `id` BINARY(16) NOT NULL,
    `product_version_id` BINARY(16) NULL,
    `not_translated_field` VARCHAR(255) NULL,
    `active` TINYINT(1) NULL DEFAULT '0',
    `country_id` BINARY(16) NOT NULL,
    `country_state_id` BINARY(16) NULL,
    `media_id` BINARY(16) NOT NULL,
    `product_id` BINARY(16) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.test_demo.translated` CHECK (JSON_VALID(`translated`)),
    KEY `fk.test_demo.country_id` (`country_id`),
    KEY `fk.test_demo.country_state_id` (`country_state_id`),
    KEY `fk.test_demo.product_id` (`product_id`,`product_version_id`),
    CONSTRAINT `fk.test_demo.country_id` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `fk.test_demo.country_state_id` FOREIGN KEY (`country_state_id`) REFERENCES `country_state` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `fk.test_demo.product_id` FOREIGN KEY (`product_id`,`product_version_id`) REFERENCES `product` (`id`,`version_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `test_demo_translation` (
    `name` VARCHAR(255) NOT NULL,
    `city` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `test_demo_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`test_demo_id`,`language_id`),
    KEY `fk.test_demo_translation.test_demo_id` (`test_demo_id`),
    KEY `fk.test_demo_translation.language_id` (`language_id`),
    CONSTRAINT `fk.test_demo_translation.test_demo_id` FOREIGN KEY (`test_demo_id`) REFERENCES `test_demo` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `fk.test_demo_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;