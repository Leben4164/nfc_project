/*
  Warnings:

  - The primary key for the `Students` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `Students` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Students" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "attendance" BOOLEAN NOT NULL,
    "attendanceTime" TEXT,
    "whatHappened" TEXT
);
INSERT INTO "new_Students" ("attendance", "attendanceTime", "id", "name", "studentId", "uid", "whatHappened") SELECT "attendance", "attendanceTime", "id", "name", "studentId", "uid", "whatHappened" FROM "Students";
DROP TABLE "Students";
ALTER TABLE "new_Students" RENAME TO "Students";
CREATE UNIQUE INDEX "Students_name_key" ON "Students"("name");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
