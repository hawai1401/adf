/*
  Warnings:

  - You are about to drop the column `badges` on the `serveur` table. All the data in the column will be lost.
  - You are about to drop the column `badges_pending` on the `serveur` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "tags" AS ENUM ('Pub', 'Rp', 'Graphisme', 'Communautaire');

-- AlterTable
ALTER TABLE "serveur" DROP COLUMN "badges",
DROP COLUMN "badges_pending",
ADD COLUMN     "tags" "tags"[] DEFAULT ARRAY[]::"tags"[],
ADD COLUMN     "tags_pending" "tags"[];

-- DropEnum
DROP TYPE "badges";
