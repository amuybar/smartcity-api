import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Waste } from './waste.schema';
import { Model } from 'mongoose';

@Injectable()
export class WasteService {
  constructor(@InjectModel(Waste.name) private wasteModel: Model<Waste>) {}

  async createWaste(data: Partial<Waste>): Promise<Waste> {
    try {
      const waste = new this.wasteModel(data);
      return waste.save();
    } catch (error) {
      throw new Error('Error creating waste data');
    }
  }

  async getAllWasteData() {
    try {
      const data = await this.wasteModel.find().exec();
      return { ...data };
    } catch (error) {
      throw new Error('Error fetching waste data');
    }
  }

  async getDataByCompany(company: string): Promise<any> {
    try {
      if (!company) {
        throw new NotFoundException('Company not found');
      }
      const data = await this.wasteModel.find({ company }).exec();
      return { ...data };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getDataByEstate(estate: string): Promise<any> {
    try {
      if (!estate) {
        throw new NotFoundException('Estate not found');
      }
      const data = await this.wasteModel.find({ estate }).exec();
      return { ...data };
    } catch (error) {
      throw new Error(error);
    }
  }
}
