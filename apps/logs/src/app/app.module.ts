import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LogSchema } from './logs.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env', isGlobal: true }),
    MongooseModule.forRoot(process.env.DB_URL, {
      dbName: 'logs'
    }),
    MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
