/*
  Warnings:

  - The `uuid` column on the `recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uuid` column on the `spaces` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `uuid` column on the `users` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "spaces" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT uuid_generate_v4();

-- AlterTable
ALTER TABLE "users" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL DEFAULT uuid_generate_v4();

-- CreateIndex
CREATE UNIQUE INDEX "recipes_uuid_key" ON "recipes"("uuid");

-- CreateIndex
CREATE INDEX "recipes_uuid_id_idx" ON "recipes"("uuid", "id");

-- CreateIndex
CREATE UNIQUE INDEX "spaces_uuid_key" ON "spaces"("uuid");

-- CreateIndex
CREATE INDEX "spaces_uuid_id_idx" ON "spaces"("uuid", "id");

-- CreateIndex
CREATE UNIQUE INDEX "users_uuid_key" ON "users"("uuid");

-- CreateIndex
CREATE INDEX "users_uuid_id_idx" ON "users"("uuid", "id");
