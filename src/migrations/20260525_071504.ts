import { MigrateUpArgs, MigrateDownArgs, sql } from "@payloadcms/db-postgres";

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users" ADD COLUMN "username" varchar NOT NULL;
  CREATE UNIQUE INDEX "users_username_idx" ON "users" USING btree ("username");`);
}

export async function down({
  db,
  payload,
  req,
}: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_username_idx";
  ALTER TABLE "users" DROP COLUMN "username";`);
}
