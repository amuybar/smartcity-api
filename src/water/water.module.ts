import { Module } from '@nestjs/common';
import { WaterController } from './water.controller';
import { WaterService } from './water.service';
import { Water, WaterSchema } from './water.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Water.name,
        schema: WaterSchema,
      },
    ]),
  ],
  controllers: [WaterController],
  providers: [WaterService],
})
export class WaterModule {}
