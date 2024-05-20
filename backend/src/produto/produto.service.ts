import { CreateProdutoDto } from './produto.dto';
import { Produto } from 'src/model/produto.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { In, Repository } from 'typeorm';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto) private readonly repository: Repository<Produto>,
  ) {}

  async save(CreateProdutoDto: CreateProdutoDto, idUsuario: string) {
    const produto = await this.repository.save(this.repository.create(CreateProdutoDto));
    return produto;
  }

  getSaldo(empresa: Produto) {
    
  }

  async getSaldoByEmpresa(options: CreateProdutoDto) {
    const empresa = await this.repository.findOne({
      where: options,
    });

    if (!empresa) return;

    const saldo = this.getSaldo(empresa);
    return saldo;
  }

  serializeEmpresas(empresas: Produto[]) {
    return empresas.map((empresa) => ({ ...empresa, saldo: this.getSaldo(empresa) }));
  }

  async findAll() {
    const empresas = await this.repository.find();
    const resultSerialize = empresas.map((empresa) => ({ ...empresa, saldo: this.getSaldo(empresa) }));
    return resultSerialize;
  }

  async findOne(id: string) {
    return await this.repository.findOne(id, { relations: ['carteira', 'carteira.lancamentos'] });
  }

  async findByDocument(documento: string) {
    return await this.repository.find({ where: { documento } });
  }

  async findManyDocument(documentos: string[]) {
    return await this.repository.find({ where: { documento: In(documentos) }, relations: ['carteira'] });
  }

  async update(id: string, CreateProdutoDto: CreateProdutoDto) {
    return await this.repository.update(id, this.repository.create(CreateProdutoDto));
  }
}
