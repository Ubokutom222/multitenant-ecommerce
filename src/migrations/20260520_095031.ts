import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "categories" ADD COLUMN "color" varchar;
  ALTER TABLE "categories" ADD COLUMN "parent_id" integer;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "categories" DROP CONSTRAINT "categories_parent_id_categories_id_fk";
  
  DROP INDEX "categories_slug_idx";
  DROP INDEX "categories_parent_idx";
  ALTER TABLE "categories" DROP COLUMN "slug";
  ALTER TABLE "categories" DROP COLUMN "color";
  ALTER TABLE "categories" DROP COLUMN "parent_id";`);
}
