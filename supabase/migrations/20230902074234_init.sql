create type "public"."SpaceRole" as enum ('OWNER', 'MEMBER');

create sequence "public"."materials_id_seq";

create sequence "public"."recipe_materials_id_seq";

create sequence "public"."recipe_suggestions_id_seq";

create sequence "public"."recipe_tags_id_seq";

create sequence "public"."recipes_id_seq";

create sequence "public"."spaces_id_seq";

create sequence "public"."tags_id_seq";

create sequence "public"."users_id_seq";

create table "public"."_prisma_migrations" (
    "id" character varying(36) not null,
    "checksum" character varying(64) not null,
    "finished_at" timestamp with time zone,
    "migration_name" character varying(255) not null,
    "logs" text,
    "rolled_back_at" timestamp with time zone,
    "started_at" timestamp with time zone not null default now(),
    "applied_steps_count" integer not null default 0
);


create table "public"."materials" (
    "id" integer not null default nextval('materials_id_seq'::regclass),
    "name" text not null
);


create table "public"."recipe_materials" (
    "id" integer not null default nextval('recipe_materials_id_seq'::regclass),
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "recipe_id" integer not null,
    "material_id" integer not null
);


create table "public"."recipe_suggestions" (
    "id" integer not null default nextval('recipe_suggestions_id_seq'::regclass),
    "rakuten_recipe_url" text not null,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "spaceId" integer not null,
    "recipeId" integer not null
);


create table "public"."recipe_tags" (
    "id" integer not null default nextval('recipe_tags_id_seq'::regclass),
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "recipe_id" integer not null,
    "tag_id" integer not null
);


create table "public"."recipes" (
    "id" integer not null default nextval('recipes_id_seq'::regclass),
    "uuid" uuid not null default gen_random_uuid(),
    "title" text not null,
    "cost" integer not null,
    "indication" text not null,
    "genre" text not null,
    "image_url" text not null,
    "recipe_url" text not null,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null,
    "space_id" integer not null
);


create table "public"."spaces" (
    "id" integer not null default nextval('spaces_id_seq'::regclass),
    "uuid" uuid not null default gen_random_uuid(),
    "name" text not null,
    "password" text not null,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP
);


create table "public"."tags" (
    "id" integer not null default nextval('tags_id_seq'::regclass),
    "name" text not null
);


create table "public"."users" (
    "id" integer not null default nextval('users_id_seq'::regclass),
    "uuid" uuid not null default gen_random_uuid(),
    "name" text not null,
    "space_role" "SpaceRole" not null default 'OWNER'::"SpaceRole",
    "image_url" text not null,
    "created_at" timestamp(3) without time zone not null default CURRENT_TIMESTAMP,
    "updated_at" timestamp(3) without time zone not null,
    "uid" text not null,
    "space_id" integer
);


alter sequence "public"."materials_id_seq" owned by "public"."materials"."id";

alter sequence "public"."recipe_materials_id_seq" owned by "public"."recipe_materials"."id";

alter sequence "public"."recipe_suggestions_id_seq" owned by "public"."recipe_suggestions"."id";

alter sequence "public"."recipe_tags_id_seq" owned by "public"."recipe_tags"."id";

alter sequence "public"."recipes_id_seq" owned by "public"."recipes"."id";

alter sequence "public"."spaces_id_seq" owned by "public"."spaces"."id";

alter sequence "public"."tags_id_seq" owned by "public"."tags"."id";

alter sequence "public"."users_id_seq" owned by "public"."users"."id";

CREATE UNIQUE INDEX _prisma_migrations_pkey ON public._prisma_migrations USING btree (id);

CREATE INDEX materials_name_id_idx ON public.materials USING btree (name, id);

CREATE UNIQUE INDEX materials_pkey ON public.materials USING btree (id);

CREATE UNIQUE INDEX recipe_materials_pkey ON public.recipe_materials USING btree (id);

CREATE UNIQUE INDEX recipe_suggestions_pkey ON public.recipe_suggestions USING btree (id);

CREATE INDEX recipe_suggestions_rakuten_recipe_url_id_idx ON public.recipe_suggestions USING btree (rakuten_recipe_url, id);

CREATE UNIQUE INDEX recipe_tags_pkey ON public.recipe_tags USING btree (id);

CREATE INDEX recipe_tags_recipe_id_tag_id_idx ON public.recipe_tags USING btree (recipe_id, tag_id);

CREATE UNIQUE INDEX recipes_pkey ON public.recipes USING btree (id);

CREATE INDEX recipes_uuid_id_idx ON public.recipes USING btree (uuid, id);

CREATE UNIQUE INDEX recipes_uuid_key ON public.recipes USING btree (uuid);

CREATE UNIQUE INDEX spaces_name_password_key ON public.spaces USING btree (name, password);

CREATE UNIQUE INDEX spaces_pkey ON public.spaces USING btree (id);

CREATE INDEX spaces_uuid_id_idx ON public.spaces USING btree (uuid, id);

CREATE UNIQUE INDEX spaces_uuid_key ON public.spaces USING btree (uuid);

CREATE INDEX tags_name_id_idx ON public.tags USING btree (name, id);

CREATE UNIQUE INDEX tags_pkey ON public.tags USING btree (id);

CREATE UNIQUE INDEX users_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX users_uid_key ON public.users USING btree (uid);

CREATE INDEX users_uuid_id_idx ON public.users USING btree (uuid, id);

CREATE UNIQUE INDEX users_uuid_key ON public.users USING btree (uuid);

alter table "public"."_prisma_migrations" add constraint "_prisma_migrations_pkey" PRIMARY KEY using index "_prisma_migrations_pkey";

alter table "public"."materials" add constraint "materials_pkey" PRIMARY KEY using index "materials_pkey";

alter table "public"."recipe_materials" add constraint "recipe_materials_pkey" PRIMARY KEY using index "recipe_materials_pkey";

alter table "public"."recipe_suggestions" add constraint "recipe_suggestions_pkey" PRIMARY KEY using index "recipe_suggestions_pkey";

alter table "public"."recipe_tags" add constraint "recipe_tags_pkey" PRIMARY KEY using index "recipe_tags_pkey";

alter table "public"."recipes" add constraint "recipes_pkey" PRIMARY KEY using index "recipes_pkey";

alter table "public"."spaces" add constraint "spaces_pkey" PRIMARY KEY using index "spaces_pkey";

alter table "public"."tags" add constraint "tags_pkey" PRIMARY KEY using index "tags_pkey";

alter table "public"."users" add constraint "users_pkey" PRIMARY KEY using index "users_pkey";

alter table "public"."recipe_materials" add constraint "recipe_materials_material_id_fkey" FOREIGN KEY (material_id) REFERENCES materials(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."recipe_materials" validate constraint "recipe_materials_material_id_fkey";

alter table "public"."recipe_materials" add constraint "recipe_materials_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."recipe_materials" validate constraint "recipe_materials_recipe_id_fkey";

alter table "public"."recipe_suggestions" add constraint "recipe_suggestions_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES recipes(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."recipe_suggestions" validate constraint "recipe_suggestions_recipeId_fkey";

alter table "public"."recipe_suggestions" add constraint "recipe_suggestions_spaceId_fkey" FOREIGN KEY ("spaceId") REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."recipe_suggestions" validate constraint "recipe_suggestions_spaceId_fkey";

alter table "public"."recipe_tags" add constraint "recipe_tags_recipe_id_fkey" FOREIGN KEY (recipe_id) REFERENCES recipes(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."recipe_tags" validate constraint "recipe_tags_recipe_id_fkey";

alter table "public"."recipe_tags" add constraint "recipe_tags_tag_id_fkey" FOREIGN KEY (tag_id) REFERENCES tags(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."recipe_tags" validate constraint "recipe_tags_tag_id_fkey";

alter table "public"."recipes" add constraint "recipes_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."recipes" validate constraint "recipes_space_id_fkey";

alter table "public"."users" add constraint "users_space_id_fkey" FOREIGN KEY (space_id) REFERENCES spaces(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."users" validate constraint "users_space_id_fkey";


