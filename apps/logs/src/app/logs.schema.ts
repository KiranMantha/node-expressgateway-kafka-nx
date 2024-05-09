import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';

@Schema({
  timestamps: true
})
export class Log {
  @Prop()
  serviceName: string;

  @Prop()
  kafkaTopic: string;

  @Prop(raw({}))
  kafkaData: JSON;
}

export const LogSchema = SchemaFactory.createForClass(Log);

export interface KafkaLogObject {
  serviceName: string;
  kafkaTopic: string;
  kafkaData: Record<string, any>;
}
