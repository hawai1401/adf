/*
  Warnings:

  - The values [Graphisme] on the enum `tags` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "tags_new" AS ENUM ('E_Sport', 'Pub', 'Rp', 'Art', 'Communautaire', 'Gaming', 'Informatique', 'Micronation', 'Sport', 'Audiovisuel');
ALTER TABLE "public"."serveur" ALTER COLUMN "tags" DROP DEFAULT;
ALTER TABLE "serveur" ALTER COLUMN "tags" TYPE "tags_new"[] USING ("tags"::text::"tags_new"[]);
ALTER TABLE "serveur" ALTER COLUMN "tags_pending" TYPE "tags_new"[] USING ("tags_pending"::text::"tags_new"[]);
ALTER TYPE "tags" RENAME TO "tags_old";
ALTER TYPE "tags_new" RENAME TO "tags";
DROP TYPE "public"."tags_old";
ALTER TABLE "serveur" ALTER COLUMN "tags" SET DEFAULT ARRAY[]::"tags"[];
COMMIT;
