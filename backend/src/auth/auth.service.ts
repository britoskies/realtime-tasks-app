import { HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from './../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  register() {
    return 'welcome new user!';
  }
  login() {
    return { msg: 'im logged in' };
  }
}
