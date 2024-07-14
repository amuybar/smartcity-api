import { Controller,Get, Query,Param, Post, Body } from '@nestjs/common';
import { WaterService } from './water.service';
import { Water } from './water.schema';

@Controller('water')
export class WaterController {
  constructor(private readonly waterService: WaterService) {}
  
  @Get()
  getWater(@Query('apartment') apartment?: string) {
    if (apartment) {
      return this.waterService.getbyHouse(parseInt(apartment));
    }
    return this.waterService.getWater();
  }
  
  @Get(':no')
    getWaterByHouse(@Param('no') no: string) {
    return this.waterService.getbyHouse(+no)
  }

  @Post()
  createWater(@Body() data: Partial<Water>) {
    return this.waterService.create(data);
  }
}
