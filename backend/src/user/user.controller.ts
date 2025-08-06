import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import type { User } from 'generated/prisma';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  getUsers(@GetUser() user: User) {
    return user;
  }
}
