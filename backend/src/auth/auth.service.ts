import { UsuariosService } from './../usuarios/usuarios.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

interface permissaoInterface {
  name: string;
  actions: string[];
  isActive: boolean;
}

@Injectable()
export class AuthService {
  constructor(private usersService: UsuariosService, private jwtService: JwtService) {}

  async validateUser(cpf: string, pass: string): Promise<any> {
    console.log("pass:", pass)
    const user = await this.usersService.findOneByCpf(cpf);
    console.log("user:", user)
    const aux = await bcrypt.compare(pass, user.password)
    console.log("aux:", aux)

    if (user ) {
      const { password, ...result } = user;
      return result;
    }
  }

  validaRota(token: string, url: string, method: string) {
    const jwt: any = this.jwtService.decode(token.replace('Bearer ', ''), { json: true });

    const resource = url.split('/');

    let allow: boolean = false;
    const permissions: permissaoInterface[] = jwt.role.permission;

    for (const permissao of permissions) {
      if (/*String(resource[1]).toLowerCase() == permissao?.name.toLowerCase() &&*/ permissao.isActive) {
        permissao.actions.filter((filter) => {
          if (method == 'GET' && (filter.toLowerCase() == 'consultar' || filter.toLowerCase() == 'ver')) {
            allow = true;
          } else if (method == 'POST' && filter.toLowerCase() == 'criar') {
            allow = true;
          } else if (method == 'PUT' && filter.toLowerCase() == 'editar') {
            allow = true;
          } else if (
            method == 'DELETE' &&
            (filter.toLowerCase() == 'excluir' || filter.toLowerCase() == 'remover')
          ) {
            allow = true;
          }
        });
      }
    }

    return true;
  }

  async login(user: any) {
    const payload = { email: user?.email, cpf: user?.cpf, sub: user?.id, status: user?.status, role: user?.role };

    console.log("payload:", payload)
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
