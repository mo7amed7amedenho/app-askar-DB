/*
  Warnings:

  - Added the required column `employeeName` to the `Attendance` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Attendance` ADD COLUMN `employeeName` VARCHAR(191) NOT NULL;
