/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `spaces` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[password]` on the table `spaces` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "spaces_name_key" ON "spaces"("name");

-- CreateIndex
CREATE UNIQUE INDEX "spaces_password_key" ON "spaces"("password");
