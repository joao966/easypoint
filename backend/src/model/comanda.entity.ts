import { Cliente } from './cliente.entity';
import { Usuario } from './usuarios.entity';

import { Column, Entity, JoinColumn, OneToMany, CreateDateColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'tb_comanda' })
export class Comanda {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Cliente, (cliente) => cliente.id)
  @JoinColumn({ name: 'id_cliente' })
  cliente: Cliente;

  @OneToMany(() => Usuario, (cliente) => cliente.id)
  @JoinColumn({ name: 'id_user' })
  user: Usuario;

  @Column()
  valor_total: number;

  @Column()
  descricao: string;

  @Column()
  items: string;

  @CreateDateColumn({ name: 'dt_criacao' })
  dtCriacao: Date;

  @Column()
  status: StatusTrasaction;
}

export type StatusTrasaction = 'open' | 'closed';
