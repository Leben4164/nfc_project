-- CreateTable
CREATE TABLE `Student` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `studentId` VARCHAR(191) NOT NULL,
    `uid` VARCHAR(191) NOT NULL,
    `attendance` BOOLEAN NOT NULL DEFAULT false,
    `whatHappened` VARCHAR(191) NULL,
    `attendanceTime` VARCHAR(191) NULL,

    UNIQUE INDEX `Student_uid_key`(`uid`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
