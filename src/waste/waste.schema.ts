import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Waste extends Document {
  @Prop({ required: true })
  estate: string;
  @Prop({ required: true })
  type: string;
  @Prop({ required: true })
  company: string;
  @Prop({
    type: Date,
    default: Date.now,
  })
  pick_date: string;
}

export const WasteSchema = SchemaFactory.createForClass(Waste);
