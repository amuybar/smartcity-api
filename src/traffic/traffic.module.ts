import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrafficController } from './traffic.controller';
import { TrafficService } from './traffic.service';
import { Traffic,TrafficSchema } from './traffic.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Traffic.name,
      schema: TrafficSchema,
    }])
  ],
  controllers: [TrafficController],
  providers: [TrafficService]
})
export class TrafficModule {}
