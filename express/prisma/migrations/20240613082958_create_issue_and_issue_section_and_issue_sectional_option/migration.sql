-- CreateTable
CREATE TABLE `user` (
    `user_id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    INDEX `user_user_id_idx`(`user_id`),
    PRIMARY KEY (`user_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issue` (
    `issue_id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `title` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `issue_issue_id_userId_idx`(`issue_id`, `userId`),
    PRIMARY KEY (`issue_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issue_section` (
    `issue_section_id` INTEGER NOT NULL AUTO_INCREMENT,
    `issueId` INTEGER NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `option_count` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `issue_section_issue_section_id_issueId_idx`(`issue_section_id`, `issueId`),
    PRIMARY KEY (`issue_section_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `issue_sectional_option` (
    `issue_sectional_option_id` INTEGER NOT NULL AUTO_INCREMENT,
    `issueSectionId` INTEGER NOT NULL,
    `body` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    INDEX `issue_sectional_option_issue_sectional_option_id_issueSectio_idx`(`issue_sectional_option_id`, `issueSectionId`),
    PRIMARY KEY (`issue_sectional_option_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `issue` ADD CONSTRAINT `issue_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issue_section` ADD CONSTRAINT `issue_section_issueId_fkey` FOREIGN KEY (`issueId`) REFERENCES `issue`(`issue_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `issue_sectional_option` ADD CONSTRAINT `issue_sectional_option_issueSectionId_fkey` FOREIGN KEY (`issueSectionId`) REFERENCES `issue_section`(`issue_section_id`) ON DELETE RESTRICT ON UPDATE CASCADE;
