import { Controller, Get, UseGuards } from '@nestjs/common';
import { User } from 'src/auth/decorators';
import { JwtGuard } from 'src/auth/guards';
import type { User as UserType } from 'generated/prisma';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor() {}

  @Get()
  getUser(@User() user: UserType) {
    return user;
  }
}
