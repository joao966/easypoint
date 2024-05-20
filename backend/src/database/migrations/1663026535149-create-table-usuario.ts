import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class createTableUsuario1663026535149 implements MigrationInterface {
  private TABLE_NAME = 'tb_usuario';

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
        name: 'dt_criacao',
        type: 'timestamp',
      },
      {
        name: 'dt_atualizacao',
        type: 'timestamp',
      },
      {
        name: 'nome',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'password',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'phone',
        type: 'varchar',
        length: '13',
      },
      {
        name: 'cpf',
        type: 'char',
        length: '11',
      },
      {
        name: 'status',
        type: 'varchar',
        length: '300',
      },
      {
        name: 'roleId',
        type: 'uuid',
        isNullable: true,
      }
    ],
  });

  private FKS = [
    {
      name: 'FK_USER_ROLE',
      columnNames: ['roleId'],
      referencedColumnNames: ['id'],
      referencedTableName: 'tb_role',
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
