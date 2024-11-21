/*
  Warnings:

  - You are about to drop the column `session_id` on the `websocket_analytics` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `websocket_analytics` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `websocket_analytics` DROP COLUMN `session_id`,
    DROP COLUMN `type`;
