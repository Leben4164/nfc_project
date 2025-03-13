-- CreateTable
CREATE TABLE "Students" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "studentId" TEXT NOT NULL,
    "uid" TEXT NOT NULL,
    "attendance" BOOLEAN NOT NULL,
    "attendanceTime" TEXT NOT NULL,
    "whatHappened" TEXT NOT NULL
);
