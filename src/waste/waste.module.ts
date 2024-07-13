import { Module } from '@nestjs/common';
import { WasteController } from './waste.controller';
import { WasteService } from './waste.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Waste, WasteSchema } from './waste.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Waste.name,
      schema:WasteSchema,
    }])
  ],
  controllers: [WasteController],
  providers: [WasteService]
})
export class WasteModule {}
