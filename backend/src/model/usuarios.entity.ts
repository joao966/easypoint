import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne
} from 'typeorm';
import { Role } from './role.entity';

@Entity({ name: 'tb_usuario' })
export class Usuario {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn({ name: 'roleId' })
  role: Role;

  @CreateDateColumn({ name: 'dt_criacao' })
  dtCriacao: Date;

  @UpdateDateColumn({ name: 'dt_atualizacao' })
  dtAtualizacao: Date;

  @Column()
  nome: string;

  @Column()
  password: string;

  @Column()
  phone: string;

  @Column()
  cpf: string;

  @Column()
  status: string;
}
