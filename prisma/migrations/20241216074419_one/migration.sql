/*
  Warnings:

  - A unique constraint covering the columns `[uid]` on the table `Students` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Students_uid_key" ON "Students"("uid");
