/*
  Warnings:

  - You are about to drop the column `name` on the `Guild` table. All the data in the column will be lost.
  - Added the required column `userId` to the `BelovedUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pattern` to the `Rhytm` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Module" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "moduleName" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "RhytmResponse" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "response" TEXT NOT NULL,
    "rhytmId" INTEGER NOT NULL,
    CONSTRAINT "RhytmResponse_rhytmId_fkey" FOREIGN KEY ("rhytmId") REFERENCES "Rhytm" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_GuildToModule" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_GuildToModule_A_fkey" FOREIGN KEY ("A") REFERENCES "Guild" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_GuildToModule_B_fkey" FOREIGN KEY ("B") REFERENCES "Module" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BelovedUser" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL
);
INSERT INTO "new_BelovedUser" ("id") SELECT "id" FROM "BelovedUser";
DROP TABLE "BelovedUser";
ALTER TABLE "new_BelovedUser" RENAME TO "BelovedUser";
CREATE UNIQUE INDEX "BelovedUser_id_key" ON "BelovedUser"("id");
CREATE TABLE "new_Guild" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guild_id" TEXT NOT NULL
);
INSERT INTO "new_Guild" ("guild_id", "id") SELECT "guild_id", "id" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
CREATE UNIQUE INDEX "Guild_guild_id_key" ON "Guild"("guild_id");
CREATE TABLE "new_Rhytm" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL DEFAULT '',
    "pattern" TEXT NOT NULL
);
INSERT INTO "new_Rhytm" ("id") SELECT "id" FROM "Rhytm";
DROP TABLE "Rhytm";
ALTER TABLE "new_Rhytm" RENAME TO "Rhytm";
PRAGMA foreign_key_check("BelovedUser");
PRAGMA foreign_key_check("Guild");
PRAGMA foreign_key_check("Rhytm");
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "User_user_id_key" ON "User"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "_GuildToModule_AB_unique" ON "_GuildToModule"("A", "B");

-- CreateIndex
CREATE INDEX "_GuildToModule_B_index" ON "_GuildToModule"("B");
