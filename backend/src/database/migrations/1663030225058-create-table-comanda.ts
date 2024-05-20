import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createTableLancamento1663030225058 implements MigrationInterface {
  private TABLE_NAME = 'tb_comanda';

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
        name: 'valor_total',
        type: 'numeric',
        default: 0,
      },
      {
        name: 'status',
        type: 'enum',
      },
      {
        name: 'descricao',
        type: 'varchar',
        length: '300',
        isNullable: true,
      },
      {
        name: 'items',
        type: 'json',
      },
      {
        name: 'dt_criacao',
        type: 'timestamp',
      },
      {
        name: 'id_cliente',
        type: 'uuid',
        isNullable: true,
      },
      {
        name: 'id_user',
        type: 'uuid',
        isNullable: true,
      }
    ],
  });

  private FKS = [
    {
      name: 'FK_ORDER_CLIENT',
      columnNames: ['id_cliente'],
      referencedColumnNames: ['id'],
      referencedTableName: 'tb_cliente',
    },
    {
      name: 'FK_ORDER_USER',
      columnNames: ['id_user'],
      referencedColumnNames: ['id'],
      referencedTableName: 'tb_usuario',
    }
  ];

  private serializeFks = this.FKS.map((options) => new TableForeignKey(options));

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(this.table);
    await queryRunner.createForeignKeys(this.TABLE_NAME, this.serializeFks);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKeys(this.TABLE_NAME, this.serializeFks);
    await queryRunner.dropTable(this.TABLE_NAME);
  }
}
