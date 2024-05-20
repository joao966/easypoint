import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { Controller, Get, Post, Body, Param, UseGuards, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CreateUsuarioDto, UpdateUsuarioDto, ChangePasswordDto } from './usuarios.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.save(createUsuarioDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll(options?: any) {
    return this.usuariosService.findAll(options);
  }

  @Get('/email/:email')
  @UseGuards(JwtAuthGuard)
  findOneByEmail(@Param('email') email: string) {
    return this.usuariosService.findOneByEamil(email);
  }
  
  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(id);
  }

  @Get('/cpf/:cpf')
  // @UseGuards(JwtAuthGuard)
  findOneByCpf(@Param('cpf') cpf: string) {
    console.log("cpf:", cpf)
    return this.usuariosService.findOneByCpf(cpf);
  }

  @Put()
  @UseGuards(JwtAuthGuard)
  update(@Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuariosService.update(updateUsuarioDto.id, updateUsuarioDto);
  }
  
  @Put('/active/:id')
  @UseGuards(JwtAuthGuard)
  active(@Param('id') id: string) {
    return this.usuariosService.active(id);
  }

  @Put('/inactive/:id')
  @UseGuards(JwtAuthGuard)
  inactive(@Param('id') id: string) {
    return this.usuariosService.inactive(id);
  }

  @Put('/pending/:id')
  @UseGuards(JwtAuthGuard)
  pending(@Param('id') id: string, @Body() changePasswordDto: ChangePasswordDto) {
    return this.usuariosService.pending(id, changePasswordDto);
  }
}
