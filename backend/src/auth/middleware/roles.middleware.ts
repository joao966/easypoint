import { Injectable, CanActivate, ExecutionContext, NestMiddleware, Header, HttpException, HttpStatus } from '@nestjs/common';
import { NextFunction } from 'express';
import { UsuariosService } from '../../usuarios/usuarios.service';
import { AuthService } from '../auth.service';

@Injectable()
export class RolesMiddleware implements NestMiddleware {

    constructor(private readonly service: AuthService) { }

    use(req: Request, res: Response, next: NextFunction) {
        let allow: boolean = false;

        try {
            let token: string = req.headers['authorization'];
            allow = this.service.validaRota(token, req.url, req.method);
        } catch (error) {
            console.info('Erro ao validar middleware')
            allow = false;
        }

        next(!allow ? new HttpException("Não Autorizado", HttpStatus.UNAUTHORIZED) : null);
    }
}