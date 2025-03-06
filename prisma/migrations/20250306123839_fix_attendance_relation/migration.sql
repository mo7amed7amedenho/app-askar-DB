/*
  Warnings:

  - You are about to drop the column `employeeName` on the `Attendance` table. All the data in the column will be lost.
  - Added the required column `normalHours` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `overtimeHours` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalTime` to the `Attendance` table without a default value. This is not possible if the table is not empty.
  - Made the column `checkIn` on table `Attendance` required. This step will fail if there are existing NULL values in that column.
  - Made the column `checkOut` on table `Attendance` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `Attendance` DROP FOREIGN KEY `Attendance_employeeId_fkey`;

-- DropIndex
DROP INDEX `Attendance_employeeId_fkey` ON `Attendance`;

-- AlterTable
ALTER TABLE `Attendance` DROP COLUMN `employeeName`,
    ADD COLUMN `normalHours` DOUBLE NOT NULL,
    ADD COLUMN `overtimeHours` DOUBLE NOT NULL,
    ADD COLUMN `totalTime` DOUBLE NOT NULL,
    MODIFY `checkIn` DATETIME(3) NOT NULL,
    MODIFY `checkOut` DATETIME(3) NOT NULL;

-- AddForeignKey
ALTER TABLE `Attendance` ADD CONSTRAINT `Attendance_employeeId_fkey` FOREIGN KEY (`employeeId`) REFERENCES `Employee`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
