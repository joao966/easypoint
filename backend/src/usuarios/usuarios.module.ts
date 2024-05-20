import { Module } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { UsuariosController } from './usuarios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Usuario } from 'src/model/usuarios.entity';
import { GlobalModule } from 'src/global.module';
// import { RoleService } from 'src/role/role.service';
import { Role } from 'src/model/role.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario]), GlobalModule],
  controllers: [UsuariosController],
  providers: [UsuariosService, Role],
  exports: [UsuariosService]
})
export class UsuariosModule {}
