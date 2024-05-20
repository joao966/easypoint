import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { Controller, Get, UseGuards, Post, Request } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log("req.user:", req.user)
    return this.authService.login(req.user);
  }

  @Get('/helloWolrd')
  async helloWorld(@Request() req) {
    return 'HELLO WOLRD'
  }
}
