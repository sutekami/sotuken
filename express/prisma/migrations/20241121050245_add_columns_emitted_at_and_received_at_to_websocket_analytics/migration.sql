/*
  Warnings:

  - Added the required column `emitted_at` to the `websocket_analytics` table without a default value. This is not possible if the table is not empty.
  - Added the required column `received_at` to the `websocket_analytics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `websocket_analytics` ADD COLUMN `emitted_at` DATETIME(3) NOT NULL,
    ADD COLUMN `received_at` DATETIME(3) NOT NULL;
