/*
  Warnings:

  - Added the required column `member_count` to the `serveur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "serveur" ADD COLUMN     "member_count" INTEGER NOT NULL;
