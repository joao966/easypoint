import { Comanda } from '../model/comanda.entity';
import { Injectable } from '@nestjs/common';
import { CreateComandaDto, UpdateComandaDto } from './comanda.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ComandaService {
  constructor(
    @InjectRepository(Comanda) private readonly repositoryLancamento: Repository<Comanda>
  ) {}

  async save(createComandaDto: CreateComandaDto) {
  console.log("createComandaDto:", createComandaDto)
  
    const lancamento = new Comanda();
    lancamento.descricao = createComandaDto.descricao;
    lancamento.dtCriacao = new Date();
    lancamento.status = createComandaDto.status;
    lancamento.valor_total = createComandaDto.valor_total;
    lancamento.items = '';


    return this.repositoryLancamento.save(lancamento);
  }


  findByStatus(status: string) {
    return this.repositoryLancamento.find({
      where: {
        status,
      },
      order: {
        dtCriacao: 'DESC',
      },
    });
  }

  findOne(id: string) {
    return this.repositoryLancamento.findOne(id);
  }

  async update(id: string, UpdateComandaDto: any) {
    return await this.repositoryLancamento.update(id, UpdateComandaDto);
  }
}
