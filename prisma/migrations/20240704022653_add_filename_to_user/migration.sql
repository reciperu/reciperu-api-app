-- CreateEnum
CREATE TYPE "SpaceRole" AS ENUM ('OWNER', 'PARTICIPANT');

-- CreateEnum
CREATE TYPE "MenuStatus" AS ENUM ('PENDING', 'CANCELED', 'CONFIRMED');

-- CreateEnum
CREATE TYPE "ActiveStatus" AS ENUM ('ONBOARDING', 'JOINED_SPACE', 'NOT_JOINED_SPACE');

-- CreateTable
CREATE TABLE "spaces" (
    "space_id" TEXT NOT NULL,
    "name" TEXT,

    CONSTRAINT "spaces_pkey" PRIMARY KEY ("space_id")
);

-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "filename" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "active_status" "ActiveStatus" NOT NULL DEFAULT 'ONBOARDING',
    "uid" TEXT NOT NULL,
    "space_role" "SpaceRole" NOT NULL DEFAULT 'OWNER',
    "space_id" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "space_invitations" (
    "token" TEXT NOT NULL,
    "expired_at" TIMESTAMP(3) NOT NULL,
    "used_at" TIMESTAMP(3),
    "space_id" TEXT NOT NULL,

    CONSTRAINT "space_invitations_pkey" PRIMARY KEY ("token")
);

-- CreateTable
CREATE TABLE "recipes" (
    "recipeId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "thumbnail_url" TEXT,
    "image_urls" TEXT,
    "recipe_url" TEXT,
    "memo" TEXT,
    "favicon_url" TEXT,
    "app_name" TEXT,
    "space_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "archived_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),

    CONSTRAINT "recipes_pkey" PRIMARY KEY ("recipeId")
);

-- CreateTable
CREATE TABLE "menus" (
    "menu_id" TEXT NOT NULL,
    "status" "MenuStatus" NOT NULL DEFAULT 'PENDING',
    "scheduledAt" DATE NOT NULL,
    "space_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "menus_pkey" PRIMARY KEY ("menu_id")
);

-- CreateTable
CREATE TABLE "requested_recipes" (
    "user_id" TEXT NOT NULL,
    "recipe_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE INDEX "spaces_space_id_idx" ON "spaces"("space_id");

-- CreateIndex
CREATE UNIQUE INDEX "users_uid_key" ON "users"("uid");

-- CreateIndex
CREATE INDEX "users_user_id_idx" ON "users"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "space_invitations_token_key" ON "space_invitations"("token");

-- CreateIndex
CREATE INDEX "space_invitations_token_idx" ON "space_invitations"("token");

-- CreateIndex
CREATE INDEX "recipes_recipeId_idx" ON "recipes"("recipeId");

-- CreateIndex
CREATE INDEX "recipes_created_at_idx" ON "recipes"("created_at");

-- CreateIndex
CREATE INDEX "menus_menu_id_idx" ON "menus"("menu_id");

-- CreateIndex
CREATE INDEX "requested_recipes_user_id_recipe_id_idx" ON "requested_recipes"("user_id", "recipe_id");

-- CreateIndex
CREATE INDEX "requested_recipes_created_at_idx" ON "requested_recipes"("created_at");

-- CreateIndex
CREATE UNIQUE INDEX "requested_recipes_user_id_recipe_id_key" ON "requested_recipes"("user_id", "recipe_id");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "space_invitations" ADD CONSTRAINT "space_invitations_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "menus" ADD CONSTRAINT "menus_space_id_fkey" FOREIGN KEY ("space_id") REFERENCES "spaces"("space_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requested_recipes" ADD CONSTRAINT "requested_recipes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "requested_recipes" ADD CONSTRAINT "requested_recipes_recipe_id_fkey" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("recipeId") ON DELETE CASCADE ON UPDATE CASCADE;
