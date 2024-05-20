import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableRole1663026258876 implements MigrationInterface {
  private TABLE_NAME = 'tb_role';

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
        name: 'name',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'description',
        type: 'varchar',
        length: '500',
      },
      {
        name: 'is_active',
        type: 'boolean',
      },
      {
        name: 'is_default',
        type: 'boolean',
        default: false
      },
      {
        name: 'permission',
        type: 'json',
      },
      {
        name: 'created_at',
        type: 'timestamp',
      },
      {
        name: 'updated_at',
        type: 'timestamp',
        isNullable: true
      },
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
