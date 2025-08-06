import { Module } from '@nestjs/common';
import { TasksGateway } from './tasks.gateway';

@Module({
  imports: [TasksGateway],
  exports: [TasksGateway],
})
export class GatewayModule {}
