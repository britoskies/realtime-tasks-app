import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateListDto } from './dto';

@Injectable()
export class TaskListService {
  constructor(private prisma: PrismaService) {}

  createList(userId: number, dto: CreateListDto) {
    return this.prisma.taskList.create({
      data: {
        title: dto.title,
        users: {
          connect: { id: userId },
        },
      },
    });
  }

  getListByToken(token: string) {
    return this.prisma.taskList.findUnique({
      where: { shareToken: token },
      include: { tasks: true },
    });
  }

  async joinSharedList(userId: number, token: string) {
    const list = await this.prisma.taskList.findUnique({
      where: { shareToken: token },
    });

    if (!list) throw new NotFoundException('Shared list not found');

    return this.prisma.taskList.update({
      where: { id: list.id },
      data: {
        users: {
          connect: { id: userId },
        },
      },
    });
  }

  getMyLists(userId: number) {
    return this.prisma.taskList.findMany({
      where: {
        users: {
          some: { id: userId },
        },
      },
    });
  }
}
