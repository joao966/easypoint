import { CreateUsuarioDto, ChangePasswordDto } from './usuarios.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Usuario } from 'src/model/usuarios.entity';
import { Repository } from 'typeorm';
// import { RoleService } from 'src/role/role.service';

enum Status {
  ATIVO = 'A',
  PENDENTE = 'P',
  INATIVO = 'i',
}

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario) private readonly repository: Repository<Usuario>,
    // private roleService: RoleService,
  ) {}

  async save(usuarioDto: CreateUsuarioDto) {
    const usuario = this.repository.create(usuarioDto);
    // usuario.role = await this.roleService.findOne(usuarioDto.roleId);

    // if (!usuario.role) {
    //   throw new HttpException('Role não encontrada', HttpStatus.BAD_REQUEST);
    // }

    let senhaTextPlain: string = (Math.random() + 10).toString(36);
    usuario.status = Status.PENDENTE;
    usuario.password = 'admin';
    usuario.dtCriacao = new Date();
    usuario.dtAtualizacao = new Date();

    const userResponse = await this.repository.save({ ...usuario });

    return userResponse;
  }

  async update(id: string, updateUsuarioDto: any) {
    return await this.repository.update(id, updateUsuarioDto);
  }

  async active(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('Usuário não encontrada', HttpStatus.NOT_FOUND);
    }

    user.status = Status.ATIVO;
    this.update(id, user);
  }

  async inactive(id: string) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('Usuário não encontrada', HttpStatus.NOT_FOUND);
    }

    user.status = Status.INATIVO;
    this.update(id, user);
  }

  async pending(id: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.findOne(id);

    if (!user) {
      throw new HttpException('Usuário não encontrada', HttpStatus.NOT_FOUND);
    } else if (
      changePasswordDto.password &&
      changePasswordDto.reviewPassword &&
      changePasswordDto.password == changePasswordDto.reviewPassword
    ) {
      user.status = Status.ATIVO;
      user.password = await this.hashPassword(changePasswordDto.password);

      return this.update(id, user);
    }

    throw new HttpException('Senhas não se coincidem', HttpStatus.NOT_FOUND);
  }

  async hashPassword(senha: string) {
    const bcrypt = require('bcrypt');
    let password: string = bcrypt.hashSync(senha, 10);

    return password;
  }

  findAll(options?: any) {
    return this.repository.find(options);
  }

  findOneByEamil(email: string) {
    return this.repository.findOne({
      where: {
        email: email,
      },
    });
  }

  findOneByCpf(cpf: string) {
    return this.repository.findOne({
      where: {
        cpf: cpf,
      },
      relations: ['role'],
    });
  }

  async findOne(id: string) {
    return this.repository.findOne(id);
  }
}
