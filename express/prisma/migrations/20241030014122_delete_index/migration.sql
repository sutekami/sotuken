-- DropIndex
DROP INDEX `issue_issue_id_userId_idx` ON `issue`;

-- DropIndex
DROP INDEX `issue_section_issue_section_id_issueId_idx` ON `issue_section`;

-- DropIndex
DROP INDEX `issue_sectional_option_issue_sectional_option_id_issueSectio_idx` ON `issue_sectional_option`;

-- CreateIndex
CREATE INDEX `issue_issue_id_idx` ON `issue`(`issue_id`);

-- CreateIndex
CREATE INDEX `issue_sectional_option_issue_sectional_option_id_idx` ON `issue_sectional_option`(`issue_sectional_option_id`);

-- RenameIndex
ALTER TABLE `issue_section` RENAME INDEX `issue_section_issueId_fkey` TO `issue_section_issueId_idx`;
