import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { TasksGateway } from 'src/gateway/tasks.gateway';

@Injectable()
export class TasksService {
  constructor(
    private prismaService: PrismaService,
    private gateway: TasksGateway,
  ) {}

  async getAllTasks(userId: number, listId: string) {
    const list = await this.prismaService.taskList.findFirst({
      where: {
        id: listId,
        users: {
          some: { id: userId },
        },
      },
    });

    if (!list) throw new ForbiddenException('Access denied to this list');

    return this.prismaService.task.findMany({
      where: { listId },
    });
  }

  async getTaskById(userId: number, taskId: number) {
    const task = await this.prismaService.task.findUnique({
      where: { id: taskId },
      include: {
        list: {
          include: {
            users: true,
          },
        },
      },
    });

    if (!task || !task.list.users.some((user) => user.id === userId)) {
      throw new ForbiddenException('Access denied to this task');
    }

    return task;
  }

  async createTask(userId: number, dto: CreateTaskDto) {
    const list = await this.prismaService.taskList.findFirst({
      where: {
        id: dto.listId,
        users: {
          some: { id: userId },
        },
      },
    });

    if (!list) throw new ForbiddenException('Access denied to this list');

    const task = await this.prismaService.task.create({
      data: {
        ...dto,
        isDone: false,
      },
    });

    this.gateway.emitTaskCreated(task);
    return task;
  }

  async updateTask(userId: number, taskId: number, dto: UpdateTaskDto) {
    const task = await this.prismaService.task.findUnique({
      where: { id: taskId },
      include: { list: { include: { users: true } } },
    });

    if (!task || !task.list.users.some((user) => user.id === userId)) {
      throw new ForbiddenException('Access denied to this list');
    }

    const updatedTask = await this.prismaService.task.update({
      where: { id: taskId },
      data: { ...dto },
    });

    this.gateway.emitTaskUpdated(updatedTask);
    return updatedTask;
  }

  async deleteTask(userId: number, taskId: number) {
    const task = await this.prismaService.task.findFirst({
      where: { id: taskId },
      include: { list: { include: { users: true } } },
    });

    if (!task || !task.list.users.some((user) => user.id === userId)) {
      throw new ForbiddenException('Access to resources denied');
    }

    const deletedTask = await this.prismaService.task.delete({
      where: {
        id: taskId,
      },
    });

    this.gateway.emitTaskDeleted(taskId);
    return deletedTask;
  }
}
