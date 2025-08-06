import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { User } from 'src/auth/decorators';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { JwtGuard } from 'src/auth/guards';

@UseGuards(JwtGuard)
@Controller('tasks')
export class TasksController {
  constructor(private taskService: TasksService) {}

  @Get('list/:listId')
  getAllTasks(@User('id') userId: number, @Param('listId') listId: string) {
    return this.taskService.getAllTasks(userId, listId);
  }

  @Get(':id')
  getTaskById(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.getTaskById(userId, taskId);
  }

  @Post('create')
  createTask(@User('id') userId: number, @Body() dto: CreateTaskDto) {
    return this.taskService.createTask(userId, dto);
  }

  @Patch(':id')
  updateTask(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
    @Body() dto: UpdateTaskDto,
  ) {
    return this.taskService.updateTask(userId, taskId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteTask(
    @User('id') userId: number,
    @Param('id', ParseIntPipe) taskId: number,
  ) {
    return this.taskService.deleteTask(userId, taskId);
  }
}
