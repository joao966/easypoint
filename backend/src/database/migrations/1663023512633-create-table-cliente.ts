import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableCliente1663023512633 implements MigrationInterface {
  private TABLE_NAME = 'tb_cliente';

  private table = new Table({
    name: this.TABLE_NAME,
    columns: [
      {
        name: 'id',
        type: 'uuid',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'uuid',
      },
      {
        name: 'nome',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'cpf',
        type: 'char',
        length: '11',
      },
      {
        name: 'password',
        type: 'char',
        length: '11',
      },
      {
        name: 'phone',
        type: 'char',
        length: '08',
      },
      {
        name: 'email',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'points',
        type: 'varchar',
        length: '300',
      }
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`);
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
