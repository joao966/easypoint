import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  Param,
  UseGuards,
  Request
} from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { CreateComandaDto, UpdateComandaDto } from './comanda.dto';

@Controller('comanda')
export class ComandaController {
  constructor(private readonly comandaLancamentoService: ComandaService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  save(@Request() req, @Body() createComandaLancamentoDto: CreateComandaDto) {
    console.log("createComandaLancamentoDto:", createComandaLancamentoDto)
    return this.comandaLancamentoService.save(createComandaLancamentoDto);
  }

  @Get('/status/:type')
  @UseGuards(JwtAuthGuard)
  async findByStatus(@Param() status: any) {
    return this.comandaLancamentoService.findByStatus(status.type);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateComandaLancamentoDto: UpdateComandaDto) {
    return this.comandaLancamentoService.update(updateComandaLancamentoDto.id, updateComandaLancamentoDto);
  }

}
