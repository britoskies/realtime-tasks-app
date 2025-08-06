import { Controller, Get, Param, Post, Body, UseGuards } from '@nestjs/common';
import { TaskListService } from './task-list.service';
import { CreateListDto } from './dto';
import { JwtGuard } from 'src/auth/guards';
import { User } from 'src/auth/decorators';

@UseGuards(JwtGuard)
@Controller('lists')
export class TaskListController {
  constructor(private readonly service: TaskListService) {}

  @Post()
  create(@User('id') userId: number, @Body() dto: CreateListDto) {
    return this.service.createList(userId, dto);
  }

  @Get('shared/:token')
  getByToken(@Param('token') token: string) {
    return this.service.getListByToken(token);
  }

  @Post('join/:token')
  join(@User('id') userId: number, @Param('token') token: string) {
    return this.service.joinSharedList(userId, token);
  }

  @Get()
  getMyLists(@User('id') userId: number) {
    return this.service.getMyLists(userId);
  }
}
