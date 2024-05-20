import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_cliente' })
export class Cliente {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nome: string;

  @Column()
  cpf: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  points: string;
}
