/*
  Warnings:

  - You are about to drop the `Blacklist` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Blacklist";

-- CreateTable
CREATE TABLE "blacklist" (
    "id" TEXT NOT NULL,
    "raison" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "blacklist_pkey" PRIMARY KEY ("id")
);
