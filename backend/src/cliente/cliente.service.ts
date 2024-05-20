import { Cliente } from './../model/cliente.entity';
import { Injectable } from '@nestjs/common';
import { CreateClienteDto, UpdateClienteDto } from './cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente) private readonly repository: Repository<Cliente>
  ) {}

  async create(createClienteDto: CreateClienteDto) {

    return await this.repository.save(this.repository.create(createClienteDto));
  }

  findAll() {
    return this.repository.find();
  }

  async findOne(id: string) {
    try {
      return await this.repository.findOne(id, { relations: ['empresas'] });
    } catch (error) {
      console.info(error);
    }
  }

  async update(id: string, updateClienteDto: UpdateClienteDto) {
    updateClienteDto.id = id;
    return await this.repository.save(this.repository.create(updateClienteDto));
  }
}
