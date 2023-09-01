/*
  Warnings:

  - You are about to drop the `invitations` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `password` to the `spaces` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "invitations" DROP CONSTRAINT "invitations_space_id_fkey";

-- AlterTable
ALTER TABLE "spaces" ADD COLUMN     "password" TEXT NOT NULL;

-- DropTable
DROP TABLE "invitations";
