import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'tb_produto' })
export class Produto {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'dt_atualizacao' })
  dtAtualizacao: Date;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @Column()
  category: string;

  @Column()
  imageUrl: string;
}
