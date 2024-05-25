/*
  Warnings:

  - The primary key for the `Guild` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `guild_id` on the `Guild` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Guild" ("id") SELECT "id" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_User" ("id") SELECT "id" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");
CREATE TABLE "new__GuildToModule" (
    "A" TEXT NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuildToModule_A_fkey" FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuildToModule_B_fkey" FOREIGN KEY ("B") REFERENCES "Module" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__GuildToModule" ("A", "B") SELECT "A", "B" FROM "_GuildToModule";
DROP TABLE "_GuildToModule";
ALTER TABLE "new__GuildToModule" RENAME TO "_GuildToModule";
CREATE UNIQUE INDEX "_GuildToModule_AB_unique" ON "_GuildToModule"("A", "B");
CREATE INDEX "_GuildToModule_B_index" ON "_GuildToModule"("B");
CREATE TABLE "new_BelovedUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "BelovedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BelovedUser_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BelovedUser" ("guildId", "id", "userId", "userName") SELECT "guildId", "id", "userId", "userName" FROM "BelovedUser";
DROP TABLE "BelovedUser";
ALTER TABLE "new_BelovedUser" RENAME TO "BelovedUser";
CREATE UNIQUE INDEX "BelovedUser_userId_key" ON "BelovedUser"("userId");
CREATE TABLE "new_Rhytm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "pattern" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    CONSTRAINT "Rhytm_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Rhytm" ("guildId", "id", "name", "pattern") SELECT "guildId", "id", "name", "pattern" FROM "Rhytm";
DROP TABLE "Rhytm";
ALTER TABLE "new_Rhytm" RENAME TO "Rhytm";
PRAGMA foreign_key_check("Guild");
PRAGMA foreign_key_check("User");
PRAGMA foreign_key_check("_GuildToModule");
PRAGMA foreign_key_check("BelovedUser");
PRAGMA foreign_key_check("Rhytm");
PRAGMA foreign_keys=ON;
