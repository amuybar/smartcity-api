import { Controller, Get, Post, Param, Body } from '@nestjs/common';
import { Waste } from './waste.schema';
import { WasteService } from './waste.service';

@Controller('waste')
export class WasteController {
  constructor(private wasteService: WasteService) {}

  @Post()
  async createWaste(@Body() data: Partial<Waste>): Promise<Waste> {
    return this.wasteService.createWaste(data);
  }

  @Get()
  async getAllWasteData(): Promise<Waste[]> {
    return this.wasteService.getAllWasteData();
  }

  @Get('company/:company')
  async getAllWasteForCompany(
    @Param('company') company: string,
  ): Promise<Waste> {
    return this.wasteService.getDataByCompany(company);
  }

  @Get('estate/:estate')
  async getAllWasteForEstate(@Param('estate') estate: string): Promise<Waste> {
    return this.wasteService.getDataByEstate(estate);
  }
}
