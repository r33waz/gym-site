import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1779815054102 implements MigrationInterface {
    name = 'AutoMigration1779815054102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_GYM_NAME"`);
        await queryRunner.query(`CREATE TABLE "gym_branch" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_At" TIMESTAMP WITH TIME ZONE NOT NULL, "gymnameEn" character varying NOT NULL, "gymnameNp" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "phoneNumer" character varying NOT NULL, "telNumber" character varying NOT NULL, "gymId" uuid, CONSTRAINT "PK_3b05a18c2f18dff2881a94eb4b2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "country"`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "gymnameEn" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "gymnameNp" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "phoneNumer" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "telNumber" character varying NOT NULL`);
        await queryRunner.query(`CREATE TYPE "public"."gym_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED', 'SUSPENDED')`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "status" "public"."gym_status_enum" NOT NULL DEFAULT 'PENDING'`);
        await queryRunner.query(`ALTER TYPE "public"."gym_members_role_enum" RENAME TO "gym_members_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."gym_members_role_enum" AS ENUM('OWNER', 'ADMIN', 'MANAGER', 'TRAINER', 'MEMBER')`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" TYPE "public"."gym_members_role_enum" USING "role"::"text"::"public"."gym_members_role_enum"`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" SET DEFAULT 'MEMBER'`);
        await queryRunner.query(`DROP TYPE "public"."gym_members_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."gym_members_role_enum" RENAME TO "gym_members_role_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."gym_members_role_enum" AS ENUM('OWNER', 'ADMIN', 'MANAGER', 'TRAINER', 'MEMBER')`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" TYPE "public"."gym_members_role_enum" USING "role"::"text"::"public"."gym_members_role_enum"`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" SET DEFAULT 'MEMBER'`);
        await queryRunner.query(`DROP TYPE "public"."gym_members_role_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."user_systemrole_enum" RENAME TO "user_systemrole_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."user_systemrole_enum" AS ENUM('SUPER_ADMIN', 'USER')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "systemRole" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "systemRole" TYPE "public"."user_systemrole_enum" USING "systemRole"::"text"::"public"."user_systemrole_enum"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "systemRole" SET DEFAULT 'USER'`);
        await queryRunner.query(`DROP TYPE "public"."user_systemrole_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_method_enum" RENAME TO "payment_method_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_method_enum" AS ENUM('cCASHash', 'ONLINE', 'CARD')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "method" TYPE "public"."payment_method_enum" USING "method"::"text"::"public"."payment_method_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_method_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_status_enum" RENAME TO "payment_status_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum" AS ENUM('PENDING', 'APPROVED', 'REJECTED')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" TYPE "public"."payment_status_enum" USING "status"::"text"::"public"."payment_status_enum"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" SET DEFAULT 'PENDING'`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum_old"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_type_enum" RENAME TO "payment_type_enum_old"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_type_enum" AS ENUM('MEMBERSHIP', 'SALE')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "type" TYPE "public"."payment_type_enum" USING "type"::"text"::"public"."payment_type_enum"`);
        await queryRunner.query(`DROP TYPE "public"."payment_type_enum_old"`);
        await queryRunner.query(`CREATE INDEX "IDX_GYM_NAME_NEPALI" ON "gym" ("gymnameNp") `);
        await queryRunner.query(`CREATE INDEX "IDX_GYM_NAME_ENGLISH" ON "gym" ("gymnameEn") `);
        await queryRunner.query(`ALTER TABLE "gym_branch" ADD CONSTRAINT "FK_d487eb0822d7ef9cf6502cb3087" FOREIGN KEY ("gymId") REFERENCES "gym"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gym_branch" DROP CONSTRAINT "FK_d487eb0822d7ef9cf6502cb3087"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_GYM_NAME_ENGLISH"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_GYM_NAME_NEPALI"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_type_enum_old" AS ENUM('membership', 'sale')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "type" TYPE "public"."payment_type_enum_old" USING "type"::"text"::"public"."payment_type_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."payment_type_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_type_enum_old" RENAME TO "payment_type_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_status_enum_old" AS ENUM('pending', 'approved', 'rejected')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" TYPE "public"."payment_status_enum_old" USING "status"::"text"::"public"."payment_status_enum_old"`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "status" SET DEFAULT 'pending'`);
        await queryRunner.query(`DROP TYPE "public"."payment_status_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_status_enum_old" RENAME TO "payment_status_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."payment_method_enum_old" AS ENUM('cash', 'online', 'card')`);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "method" TYPE "public"."payment_method_enum_old" USING "method"::"text"::"public"."payment_method_enum_old"`);
        await queryRunner.query(`DROP TYPE "public"."payment_method_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."payment_method_enum_old" RENAME TO "payment_method_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."user_systemrole_enum_old" AS ENUM('super_admin', 'user')`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "systemRole" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "systemRole" TYPE "public"."user_systemrole_enum_old" USING "systemRole"::"text"::"public"."user_systemrole_enum_old"`);
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "systemRole" SET DEFAULT 'user'`);
        await queryRunner.query(`DROP TYPE "public"."user_systemrole_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."user_systemrole_enum_old" RENAME TO "user_systemrole_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."gym_members_role_enum_old" AS ENUM('owner', 'admin', 'manager', 'trainer', 'member')`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" TYPE "public"."gym_members_role_enum_old" USING "role"::"text"::"public"."gym_members_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" SET DEFAULT 'member'`);
        await queryRunner.query(`DROP TYPE "public"."gym_members_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."gym_members_role_enum_old" RENAME TO "gym_members_role_enum"`);
        await queryRunner.query(`CREATE TYPE "public"."gym_members_role_enum_old" AS ENUM('owner', 'admin', 'manager', 'trainer', 'member')`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" TYPE "public"."gym_members_role_enum_old" USING "role"::"text"::"public"."gym_members_role_enum_old"`);
        await queryRunner.query(`ALTER TABLE "gym_members" ALTER COLUMN "role" SET DEFAULT 'member'`);
        await queryRunner.query(`DROP TYPE "public"."gym_members_role_enum"`);
        await queryRunner.query(`ALTER TYPE "public"."gym_members_role_enum_old" RENAME TO "gym_members_role_enum"`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "status"`);
        await queryRunner.query(`DROP TYPE "public"."gym_status_enum"`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "telNumber"`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "phoneNumer"`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "gymnameNp"`);
        await queryRunner.query(`ALTER TABLE "gym" DROP COLUMN "gymnameEn"`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "country" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "gym" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`DROP TABLE "gym_branch"`);
        await queryRunner.query(`CREATE INDEX "IDX_GYM_NAME" ON "gym" ("name") `);
    }

}
