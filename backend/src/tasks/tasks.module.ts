import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TasksGateway } from 'src/gateway/tasks.gateway';

@Module({
  imports: [TasksGateway],
  providers: [TasksService, TasksGateway],
  controllers: [TasksController],
})
export class TasksModule {}
