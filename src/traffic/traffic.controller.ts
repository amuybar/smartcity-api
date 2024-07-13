import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TrafficService } from './traffic.service';
import { Traffic } from './traffic.schema';

@Controller('traffic')
export class TrafficController {
  constructor(private readonly trafficService: TrafficService) {}

  @Post()
  async createTraffic(@Body() data: Partial<Traffic>): Promise<Traffic> {
    return this.trafficService.createTraffic(data);
  }

  @Get()
  async getAllTraffic(): Promise<Traffic[]> {
    return this.trafficService.getAllTraffic();
  }

  @Get(':location')
  async getByLocation(@Param('location') location: string) {
    return this.trafficService.getTrafficByLocation(location);
  }
}
