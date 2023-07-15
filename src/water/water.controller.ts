import { Controller,Get } from '@nestjs/common';
import { WaterService } from './water.service';

@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}
  @Get()
  getWater(): string {
    return this.waterService.getWater();
  }
}
