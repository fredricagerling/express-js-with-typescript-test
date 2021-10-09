-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "platform" TEXT,
    "releaseYear" INTEGER,
    "imageUrl" TEXT,
    "description" TEXT
);
