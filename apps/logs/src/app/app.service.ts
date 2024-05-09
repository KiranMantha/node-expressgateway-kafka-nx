import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { KafkaLogObject, Log } from './logs.schema';

@Injectable()
export class AppService {
  constructor(@InjectModel(Log.name) private logModel: Model<Log>) {}

  insertLog(record: KafkaLogObject) {
    console.log('\nlog MS:', record, '\n');
    this.logModel.insertMany([record]);
  }
}
