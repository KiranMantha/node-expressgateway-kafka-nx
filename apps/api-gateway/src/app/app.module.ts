import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectionTokens, KafkaConsumers } from './tokens';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: InjectionTokens.BILLING_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'billing',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: KafkaConsumers.BILLING_CONSUMER
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
