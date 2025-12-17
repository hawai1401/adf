/*
  Warnings:

  - You are about to drop the column `refreshToken` on the `UserToken` table. All the data in the column will be lost.
  - Added the required column `expiresAt` to the `UserToken` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UserToken" DROP COLUMN "refreshToken",
ADD COLUMN     "expiresAt" TIMESTAMP(3) NOT NULL;
