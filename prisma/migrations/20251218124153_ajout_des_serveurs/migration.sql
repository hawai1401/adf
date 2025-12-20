/*
  Warnings:

  - You are about to drop the `UserToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "badges" AS ENUM ('Pub', 'Rp', 'Graphisme', 'Communautaire');

-- DropTable
DROP TABLE "UserToken";

-- CreateTable
CREATE TABLE "serveur" (
    "id" TEXT NOT NULL,
    "nom" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "logoURL" TEXT NOT NULL,
    "badges" "badges"[],
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "serveur_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "serveur_id_key" ON "serveur"("id");
