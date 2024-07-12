import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Traffic extends Document {
  @Prop({ required: true })
  location: string;

  @Prop({ required: true })
  vehicleCount: number;

  @Prop({ default: Date.now })
  timestamp: Date;
}

export const TrafficSchema = SchemaFactory.createForClass(Traffic);
