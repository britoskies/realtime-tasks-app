import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Logger } from '@nestjs/common';
import { Task } from 'generated/prisma';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class TasksGateway {
  @WebSocketServer()
  server: Server;

  private logger = new Logger('TasksGateway');

  emitTaskCreated(task: Task) {
    this.logger.log('Emitting task created', JSON.stringify(task));
    this.server.emit('taskCreated', JSON.stringify(task));
  }

  emitTaskUpdated(task: Task) {
    this.logger.log('Emitting task updated', JSON.stringify(task));
    this.server.emit('taskUpdated', JSON.stringify(task));
  }

  emitTaskDeleted(taskId: number) {
    this.logger.log('Emitting task deleted');
    this.server.emit('taskDeleted', taskId);
  }
}
