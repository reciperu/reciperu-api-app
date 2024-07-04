/*
  Warnings:

  - The `image_urls` column on the `recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `image_filenames` column on the `recipes` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "recipes" DROP COLUMN "image_urls",
ADD COLUMN     "image_urls" TEXT[],
DROP COLUMN "image_filenames",
ADD COLUMN     "image_filenames" TEXT[];
