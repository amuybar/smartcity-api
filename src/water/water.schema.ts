import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Water extends Document {
  @Prop({ required: true })
  apartment: string;
  @Prop({ required: true })
  house_no: string;
  @Prop({ required: true })
  bill: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  invoice_date: string;
}

export const WaterSchema = SchemaFactory.createForClass(Water);
