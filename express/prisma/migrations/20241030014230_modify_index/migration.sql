-- DropIndex
DROP INDEX `issue_issue_id_idx` ON `issue`;

-- DropIndex
DROP INDEX `issue_sectional_option_issue_sectional_option_id_idx` ON `issue_sectional_option`;

-- DropIndex
DROP INDEX `user_user_id_idx` ON `user`;

-- RenameIndex
ALTER TABLE `issue` RENAME INDEX `issue_userId_fkey` TO `issue_userId_idx`;

-- RenameIndex
ALTER TABLE `issue_sectional_option` RENAME INDEX `issue_sectional_option_issueSectionId_fkey` TO `issue_sectional_option_issueSectionId_idx`;
