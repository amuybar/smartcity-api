import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Water } from './water.schema';

@Injectable()
export class WaterService {
  constructor(@InjectModel(Water.name) private waterModel: Model<Water>) {}

  async getWater(): Promise<Water[]> {
    return await this.waterModel.find().exec();
  }

  async getbyHouse(no: number): Promise<Water> {
    return await this.waterModel.findOne({ house_no: no }).exec();
  }

  async create(data: Partial<Water>): Promise<Water> {
    try {
      const water = new this.waterModel(data);
      return water.save();
    } catch (error) {
      throw new Error('Error creating water data');
    }
  }
  async update(no: number, data: Partial<Water>): Promise<Water> { 
    try {
      const water = await this.waterModel.findByIdAndUpdate(no, data, { new: true }).exec();
      if (!water) {
        throw new Error('Water not found');
      }
      return water;
    } catch (error) {
      throw new Error('Error updating water data');
    }
  }
}
