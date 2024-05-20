import { Comanda } from '../model/comanda.entity';
import { Module } from '@nestjs/common';
import { ComandaService } from './comanda.service';
import { ComandaController } from './comanda.controller';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([Comanda])
  ],
  controllers: [ComandaController],
  providers: [ComandaService],
})
export class ComandaModule {}
