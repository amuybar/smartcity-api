import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Traffic } from './traffic.schema';

@Injectable()
export class TrafficService {
  constructor(
    @InjectModel(Traffic.name) private readonly trafficModel: Model<Traffic>,
  ) {}

  async createTraffic(data: Partial<Traffic>): Promise<Traffic> {
    try {
      const traffic = new this.trafficModel(data);
      return traffic.save();
    } catch (error) {
      throw new Error('Error creating traffic data');
    }
  }
  async getAllTraffic(): Promise<Traffic[]> {
    try {
      return this.trafficModel.find().exec();
    } catch (error) {
      throw new Error('Error fetching traffic data');
    }
  }

  async getTrafficByLocation(location: string): Promise<Traffic[]> {
    if (!location) {
      throw new NotFoundException('Location must be provided');
    }
    const result = await this.trafficModel.find({ location }).exec();
    return result;
  }
}
