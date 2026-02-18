import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1771433435733 implements MigrationInterface {
    name = 'AutoMigration1771433435733'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_At" TIMESTAMP WITH TIME ZONE NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "is_active" boolean NOT NULL DEFAULT true, "last_login" TIMESTAMP, "login_attempts" integer NOT NULL DEFAULT '0', "userId" uuid, CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email"), CONSTRAINT "REL_373ead146f110f04dad6084815" UNIQUE ("userId"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_ACTIVE" ON "auth" ("is_active") `);
        await queryRunner.query(`CREATE INDEX "IDX_AUTH_EMAIL" ON "auth" ("email") `);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('super_admin', 'gym_admin', 'gym_staff', 'manager', 'trainer', 'user')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_At" TIMESTAMP WITH TIME ZONE NOT NULL, "username" character varying NOT NULL, "first_name" character varying NOT NULL, "middle_name" character varying NOT NULL, "last_name" character varying NOT NULL, "gender" character varying NOT NULL, "role" "public"."user_role_enum" NOT NULL DEFAULT 'user', "contact_number" character varying NOT NULL, "address" character varying NOT NULL, "city" character varying NOT NULL, "state" character varying NOT NULL, "country" character varying NOT NULL, "profile_picture" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_USER_CITY" ON "user" ("city") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_CONTACT" ON "user" ("contact_number") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_ROLE" ON "user" ("role") `);
        await queryRunner.query(`CREATE INDEX "IDX_USER_USERNAME" ON "user" ("username") `);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_USERNAME"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_ROLE"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_CONTACT"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_USER_CITY"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_EMAIL"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_AUTH_ACTIVE"`);
        await queryRunner.query(`DROP TABLE "auth"`);
    }

}
