/*
  Warnings:

  - Added the required column `link_pending` to the `serveur` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "serveur" ADD COLUMN     "badges_pending" "badges"[],
ADD COLUMN     "link_pending" TEXT NOT NULL,
ALTER COLUMN "badges" SET DEFAULT ARRAY[]::"badges"[],
ALTER COLUMN "link" SET DEFAULT '';
