import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectionTokens, KafkaConsumers } from './tokens';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: InjectionTokens.LOGS_SERVICE,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'logs',
            brokers: ['localhost:9092']
          },
          consumer: {
            groupId: KafkaConsumers.LOGS_CONSUMER
          }
        }
      }
    ])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
