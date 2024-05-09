import { Controller, Inject } from '@nestjs/common';
import { ClientKafka, MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { InjectionTokens } from './tokens';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(InjectionTokens.LOGS_SERVICE) private logsClient: ClientKafka
  ) {}

  // Message pattern both listen to incoming topic and acknowledge back to emitter.
  // This function respond to topic 'get_user_by_id' and returns the user with matching userId
  @MessagePattern('get_user_by_id')
  getUserById(data: { userId: string }) {
    this.logsClient.emit('insert_log', {
      serviceName: 'users',
      kafkaTopic: 'get_user_by_id',
      kafkaData: data
    });
    return this.appService.getUserById(data.userId);
  }
}
