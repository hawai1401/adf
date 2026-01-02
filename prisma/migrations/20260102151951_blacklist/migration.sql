/*
  Warnings:

  - You are about to drop the `post` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "post" DROP CONSTRAINT "post_authorId_fkey";

-- DropTable
DROP TABLE "post";

-- CreateTable
CREATE TABLE "Blacklist" (
    "id" TEXT NOT NULL,
    "raison" TEXT NOT NULL,
    "message" TEXT NOT NULL,

    CONSTRAINT "Blacklist_pkey" PRIMARY KEY ("id")
);
