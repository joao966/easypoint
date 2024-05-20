import { RoleModule } from './role/role.module';
import { Role } from './model/role.entity';
import { Usuario } from 'src/model/usuarios.entity';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Usuario, Role]),
    RoleModule,
  ]
})
export class GlobalModule { }
