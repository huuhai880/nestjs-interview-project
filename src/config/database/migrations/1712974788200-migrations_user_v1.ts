import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationsUserV11712974788200 implements MigrationInterface {
    name = 'MigrationsUserV11712974788200'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_name\` varchar(100) NOT NULL, \`password\` varchar(50) NOT NULL, \`full_name\` varchar(50) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_created\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6), \`user_updated\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL DEFAULT NULL, \`user_deleted\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL DEFAULT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`deleted_at\` \`deleted_at\` datetime(6) NULL`);
        await queryRunner.query(`ALTER TABLE \`products\` CHANGE \`updated_at\` \`updated_at\` datetime(6) NULL ON UPDATE CURRENT_TIMESTAMP(6)`);
        await queryRunner.query(`DROP TABLE \`users\``);
    }

}
