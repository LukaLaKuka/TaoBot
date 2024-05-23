/*
  Warnings:

  - The primary key for the `BelovedUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `BelovedUser` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `userId` on the `BelovedUser` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `guildId` to the `BelovedUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userName` to the `BelovedUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `guildId` to the `Rhytm` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BelovedUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "userName" TEXT NOT NULL,
    "guildId" INTEGER NOT NULL,
    CONSTRAINT "BelovedUser_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BelovedUser_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BelovedUser" ("id", "userId") SELECT "id", "userId" FROM "BelovedUser";
DROP TABLE "BelovedUser";
ALTER TABLE "new_BelovedUser" RENAME TO "BelovedUser";
CREATE UNIQUE INDEX "BelovedUser_userId_key" ON "BelovedUser"("userId");
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_userId_key" ON "User"("userId");
CREATE TABLE "new_Rhytm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "pattern" TEXT NOT NULL,
    "guildId" INTEGER NOT NULL,
    CONSTRAINT "Rhytm_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rhytm" ("id", "name", "pattern") SELECT "id", "name", "pattern" FROM "Rhytm";
DROP TABLE "Rhytm";
ALTER TABLE "new_Rhytm" RENAME TO "Rhytm";
PRAGMA foreign_key_check("BelovedUser");
PRAGMA foreign_key_check("User");
PRAGMA foreign_key_check("Rhytm");
PRAGMA foreign_keys=ON;
