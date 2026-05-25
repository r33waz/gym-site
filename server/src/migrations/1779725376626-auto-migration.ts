import { MigrationInterface, QueryRunner } from "typeorm";

export class AutoMigration1779725376626 implements MigrationInterface {
    name = 'AutoMigration1779725376626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gym" DROP CONSTRAINT "FK_2d945c0c256305baa1db3121308"`);
        await queryRunner.query(`ALTER TABLE "auth" ADD "userId" uuid`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "UQ_373ead146f110f04dad60848154" UNIQUE ("userId")`);
        await queryRunner.query(`CREATE INDEX "IDX_a7ab1927a5e7f13014f2d376cb" ON "gym_members" ("role") `);
        await queryRunner.query(`CREATE INDEX "IDX_17a26d20964ea7670b28d10f38" ON "gym_members" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_9d5bff6b44782bb5cedf9abce3" ON "gym_members" ("gymId") `);
        await queryRunner.query(`ALTER TABLE "gym_members" ADD CONSTRAINT "UQ_bb09bc3dd1fc85c53c5f8b3e3f1" UNIQUE ("userId", "gymId")`);
        await queryRunner.query(`ALTER TABLE "auth" ADD CONSTRAINT "FK_373ead146f110f04dad60848154" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "gym" ADD CONSTRAINT "FK_2d945c0c256305baa1db3121308" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "gym" DROP CONSTRAINT "FK_2d945c0c256305baa1db3121308"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "FK_373ead146f110f04dad60848154"`);
        await queryRunner.query(`ALTER TABLE "gym_members" DROP CONSTRAINT "UQ_bb09bc3dd1fc85c53c5f8b3e3f1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9d5bff6b44782bb5cedf9abce3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_17a26d20964ea7670b28d10f38"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a7ab1927a5e7f13014f2d376cb"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP CONSTRAINT "UQ_373ead146f110f04dad60848154"`);
        await queryRunner.query(`ALTER TABLE "auth" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "gym" ADD CONSTRAINT "FK_2d945c0c256305baa1db3121308" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
