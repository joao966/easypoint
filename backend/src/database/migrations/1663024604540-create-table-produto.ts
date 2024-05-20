import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createTableProduto1663024604540 implements MigrationInterface {
  private TABLE_NAME = 'tb_produto';

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
        name: 'dt_atualizacao',
        type: 'timestamp',
      },
      {
        name: 'name',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'quantity',
        type: 'numeric',
        precision: 10,
        scale: 2,
        default: '0',
      },
      {
        name: 'price',
        type: 'numeric',
        default: 0,
      },
      {
        name: 'category',
        type: 'varchar',
        length: '13',
        isNullable: true,
      },
      {
        name: 'imageUrl',
        type: 'varchar',
        length: '13',
        isNullable: true,
      }
    ],
  });

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
