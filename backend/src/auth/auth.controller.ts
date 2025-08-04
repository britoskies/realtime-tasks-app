import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import type { AuthDto } from 'src/dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register();
  }

  @Post('login')
  login() {
    return this.authService.login();
  }
}
