import { configService } from '../config/config.service';


export const jwtConstants = () => {
  if (!configService.isProduction()) {
    const secret: string = 'prod'
    return secret;
  }

  const secret: string = 'dev';
  return secret;
}
