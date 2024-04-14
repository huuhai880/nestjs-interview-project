import { MigrationInterface, QueryRunner } from "typeorm";

export class MigrationsUserAndProductV11712997905717 implements MigrationInterface {
    name = 'MigrationsUserAndProductV11712997905717'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`status\` int NOT NULL DEFAULT '1', PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`product_name\` varchar(100) NOT NULL, \`category_id\` int NOT NULL, \`type_of_product\` int NOT NULL, \`price\` int NOT NULL DEFAULT '0', \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`user_created\` varchar(255) NOT NULL, \`updated_at\` datetime(6) NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP(6), \`user_updated\` varchar(255) NULL, \`deleted_at\` datetime(6) NULL DEFAULT NULL, \`user_deleted\` varchar(255) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
