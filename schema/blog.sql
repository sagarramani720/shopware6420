CREATE TABLE `blog_category` (
    `id` BINARY(16) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.blog_category.translated` CHECK (JSON_VALID(`translated`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_category_translation` (
    `name` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `blog_category_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`blog_category_id`,`language_id`),
    KEY `fk.blog_category_translation.blog_category_id` (`blog_category_id`),
    KEY `fk.blog_category_translation.language_id` (`language_id`),
    CONSTRAINT `fk.blog_category_translation.blog_category_id` FOREIGN KEY (`blog_category_id`) REFERENCES `blog_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `fk.blog_category_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_child` (
    `id` BINARY(16) NOT NULL,
    `release_date` DATE NOT NULL,
    `active` TINYINT(1) NULL DEFAULT '0',
    `author` VARCHAR(255) NOT NULL,
    `category_ids` JSON NULL,
    `product_ids` JSON NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    PRIMARY KEY (`id`),
    CONSTRAINT `json.blog_child.category_ids` CHECK (JSON_VALID(`category_ids`)),
    CONSTRAINT `json.blog_child.product_ids` CHECK (JSON_VALID(`product_ids`)),
    CONSTRAINT `json.blog_child.translated` CHECK (JSON_VALID(`translated`))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_child_translation` (
    `name` VARCHAR(255) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `created_at` DATETIME(3) NOT NULL,
    `updated_at` DATETIME(3) NULL,
    `blog_child_id` BINARY(16) NOT NULL,
    `language_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`blog_child_id`,`language_id`),
    KEY `fk.blog_child_translation.blog_child_id` (`blog_child_id`),
    KEY `fk.blog_child_translation.language_id` (`language_id`),
    CONSTRAINT `fk.blog_child_translation.blog_child_id` FOREIGN KEY (`blog_child_id`) REFERENCES `blog_child` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `fk.blog_child_translation.language_id` FOREIGN KEY (`language_id`) REFERENCES `language` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `blog_mapping` (
    `blog_category` BINARY(16) NOT NULL,
    `category_id` BINARY(16) NOT NULL,
    PRIMARY KEY (`blog_category`,`category_id`),
    KEY `fk.blog_mapping.blog_category` (`blog_category`),
    KEY `fk.blog_mapping.category_id` (`category_id`),
    CONSTRAINT `fk.blog_mapping.blog_category` FOREIGN KEY (`blog_category`) REFERENCES `blog_category` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT `fk.blog_mapping.category_id` FOREIGN KEY (`category_id`) REFERENCES `blog_child` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;