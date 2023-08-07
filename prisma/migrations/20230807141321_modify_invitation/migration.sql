/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `invitations` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "invitations_code_key" ON "invitations"("code");
