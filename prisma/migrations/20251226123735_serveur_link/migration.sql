/*
  Warnings:

  - Added the required column `link` to the `serveur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "serveur" ADD COLUMN     "link" TEXT NOT NULL;
