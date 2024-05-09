import { Controller } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { KafkaLogObject } from './logs.schema';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // listen to 'insert_log' event and insert the log object into mongodb
  @EventPattern('insert_log')
  insertLog(data: KafkaLogObject) {
    this.appService.insertLog(data);
  }
}
