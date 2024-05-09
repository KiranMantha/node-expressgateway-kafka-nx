import { Controller, Inject, OnModuleInit } from '@nestjs/common';
import { ClientKafka, EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { InjectionTokens } from './tokens';

@Controller()
export class AppController implements OnModuleInit {
  constructor(
    private readonly appService: AppService,
    @Inject(InjectionTokens.USERS_SERVICE) private usersClient: ClientKafka,
    @Inject(InjectionTokens.LOGS_SERVICE) private logsClient: ClientKafka
  ) {}

  // Event pattern only listen to incoming topic. it won't acknowledge back to emitter.
  // This function will be called for topic 'create_invoice'
  // value will have same signature of 'CreateInvoiceRequest' in api-gateway
  @EventPattern('create_invoice')
  createInvoice(data: { userId: string; orderId: string; price: number }) {
    this.logsClient.emit('insert_log', {
      serviceName: 'billing',
      kafkaTopic: 'create_invoice',
      kafkaData: data
    });
    this.appService.createInvoice(data);
  }

  onModuleInit() {
    // subscribe to response for this event
    this.usersClient.subscribeToResponseOf('get_user_by_id');
  }
}
