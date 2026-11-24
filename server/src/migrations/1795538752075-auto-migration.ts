import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1795538752075 implements MigrationInterface {
    name = 'AutoMigration1795538752075'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."auth_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING_VERIFICATION')`);
        await queryRunner.query(`CREATE TABLE "auth" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "username" character varying(50) NOT NULL, "passwordHash" character varying(255) NOT NULL, "status" "public"."auth_status_enum" NOT NULL DEFAULT 'PENDING_VERIFICATION', "isEmailVerified" boolean NOT NULL DEFAULT false, "isPhoneVerified" boolean NOT NULL DEFAULT false, "lastLoginAt" TIMESTAMP WITH TIME ZONE, "passwordChangedAt" TIMESTAMP WITH TIME ZONE, "user_id" uuid, CONSTRAINT "UQ_b54f616411ef3824f6a5c06ea46" UNIQUE ("email"), CONSTRAINT "UQ_366ebf23d8f3781bb7bb37abbd1" UNIQUE ("username"), CONSTRAINT "REL_9922406dc7d70e20423aeffadf" UNIQUE ("user_id"), CONSTRAINT "PK_7e416cf6172bc5aec04244f6459" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_users_name" ON "auth" ("username") `);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "firstName" character varying(10) NOT NULL, "middleName" character varying(100), "lastName" character varying(10) NOT NULL, "phoneNumber" character varying(20), "status" "public"."user_status_enum" NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_mobile_number" ON "user" ("phoneNumber") `);
        await queryRunner.query(`CREATE INDEX "IDX_users_last_name" ON "user" ("lastName") `);
        await queryRunner.query(`CREATE INDEX "IDX_users_first_name" ON "user" ("firstName") `);
        await queryRunner.query(`CREATE TABLE "login_history" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "user_auth_id" uuid NOT NULL, "isSuccessful" boolean NOT NULL, "ipAddress" character varying(45), "userAgent" character varying(255), "failureReason" character varying(255), CONSTRAINT "PK_fe377f36d49c39547cb6b9f0727" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refresh_tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_At" TIMESTAMP NOT NULL DEFAULT now(), "updated_At" TIMESTAMP NOT NULL DEFAULT now(), "user_auth_id" uuid NOT NULL, "tokenHash" character varying(255) NOT NULL, "userAgent" character varying(255), "ipAddress" character varying(45), "expiresAt" TIMESTAMP WITH TIME ZONE NOT NULL, "revokedAt" TIMESTAMP WITH TIME ZONE, CONSTRAINT "UQ_c25bc63d248ca90e8dcc1d92d06" UNIQUE ("tokenHash"), CONSTRAINT "PK_7d8bee0204106019488c4c50ffa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_e60af4d15daa02a907e4ef9a80" ON "refresh_tokens" ("user_auth_id") `);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_9922406dc7d70e20423aeffadf3" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "login_history" ADD CONSTRAINT "FK_56260e1daf90ed3f59dc0a2308b" FOREIGN KEY ("user_auth_id") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refresh_tokens" ADD CONSTRAINT "FK_e60af4d15daa02a907e4ef9a80a" FOREIGN KEY ("user_auth_id") REFERENCES "auth"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "refresh_tokens" DROP CONSTRAINT "FK_e60af4d15daa02a907e4ef9a80a"`);
        await queryRunner.query(`ALTER TABLE "login_history" DROP CONSTRAINT "FK_56260e1daf90ed3f59dc0a2308b"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_9922406dc7d70e20423aeffadf3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e60af4d15daa02a907e4ef9a80"`);
        await queryRunner.query(`DROP TABLE "refresh_tokens"`);
        await queryRunner.query(`DROP TABLE "login_history"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_users_first_name"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_users_last_name"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_mobile_number"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_users_name"`);
        await queryRunner.query(`DROP TABLE "auth"`);
        await queryRunner.query(`DROP TYPE "public"."auth_status_enum"`);
    }

}
