/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app/app.module';
import { KafkaConsumers } from './app/tokens';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['localhost:9092'] // kafka port
        },
        consumer: {
          groupId: KafkaConsumers.USERS_CONSUMER
        }
      }
    }
  );
  console.log('\nusers service started\n');
  await app.listen();
  // Logger.log(
  //   `🚀 Application is running on: http://localhost:${port}/`
  // );
}

bootstrap();
