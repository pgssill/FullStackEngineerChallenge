import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddAdmin1605185739822 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "INSERT INTO `users` (`first_name`, `last_name`, `is_admin`) VALUES ('Admin', 'User', '1');",
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DELETE FROM `paypay_test`.`users` WHERE  `id`=1;');
    }
}
