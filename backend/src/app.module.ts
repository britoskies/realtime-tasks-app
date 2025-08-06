import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TasksModule } from './tasks/tasks.module';
import { GatewayModule } from './gateway/gateway.module';
import { TaskListModule } from './task-list/task-list.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    PrismaModule,
    TasksModule,
    GatewayModule,
    TaskListModule,
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class AppModule {}
