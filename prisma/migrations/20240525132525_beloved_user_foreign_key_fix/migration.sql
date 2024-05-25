-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BelovedUser" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "guildId" INTEGER NOT NULL,
    CONSTRAINT "BelovedUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "BelovedUser_guildId_fkey" FOREIGN KEY ("guildId") REFERENCES "Guild" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_BelovedUser" ("guildId", "id", "userId", "userName") SELECT "guildId", "id", "userId", "userName" FROM "BelovedUser";
DROP TABLE "BelovedUser";
ALTER TABLE "new_BelovedUser" RENAME TO "BelovedUser";
CREATE UNIQUE INDEX "BelovedUser_userId_key" ON "BelovedUser"("userId");
PRAGMA foreign_key_check("BelovedUser");
PRAGMA foreign_keys=ON;
