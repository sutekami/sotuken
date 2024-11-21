/*
  Warnings:

  - Added the required column `room_id` to the `websocket_analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `websocket_analytics` ADD COLUMN `room_id` VARCHAR(191) NOT NULL;
