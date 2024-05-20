import { PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

export abstract class BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @CreateDateColumn({ name: 'dt_criacao', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    dtCriacao: Date;

    @UpdateDateColumn({ name: 'dt_atualizacao', type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
    dtAtualizacao: Date;
}