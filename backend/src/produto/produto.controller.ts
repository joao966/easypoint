import { Produto } from 'src/model/produto.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateProdutoDto } from './produto.dto';
import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('produto')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async save(@Request() req, @Body() CreateProdutoDto: CreateProdutoDto): Promise<Produto> {
    return await this.produtoService.save(CreateProdutoDto, req);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.produtoService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id') id: string) {
    return await this.produtoService.findOne(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() updateEmpresaDto: any) {
    return this.produtoService.update(id, updateEmpresaDto);
  }
}
