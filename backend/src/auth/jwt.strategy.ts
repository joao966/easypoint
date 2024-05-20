import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants(),
    });
  }

  async validate(payload: any) {
    /* poderíamos fazer uma pesquisa de banco de dados em nosso validate()método para extrair mais informações sobre o usuário, 
    resultando em um userobjeto mais enriquecido disponível em nosso arquivo Request. 
    Este também é o lugar em que podemos decidir fazer mais validação de token, como procurar userIdem uma lista de tokens revogados, 
    permitindo-nos realizar a revogação de token */

    return { userId: payload.sub, email: payload.email, role: payload.role, status: payload.status };
  }
}