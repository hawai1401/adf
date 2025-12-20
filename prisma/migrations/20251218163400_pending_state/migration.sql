/*
  Warnings:

  - Added the required column `description_pending` to the `serveur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "serveur" ADD COLUMN     "description_pending" TEXT NOT NULL,
ADD COLUMN     "pending" BOOLEAN NOT NULL DEFAULT false;
