/*
  Warnings:

  - Added the required column `guild_id` to the `Guild` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Guild" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guild_id" TEXT NOT NULL,
    "name" TEXT NOT NULL
);
INSERT INTO "new_Guild" ("id", "name") SELECT "id", "name" FROM "Guild";
DROP TABLE "Guild";
ALTER TABLE "new_Guild" RENAME TO "Guild";
CREATE UNIQUE INDEX "Guild_id_key" ON "Guild"("id");
CREATE UNIQUE INDEX "Guild_guild_id_key" ON "Guild"("guild_id");
PRAGMA foreign_key_check("Guild");
PRAGMA foreign_keys=ON;
