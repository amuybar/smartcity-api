import { Injectable } from '@nestjs/common';

@Injectable()
export class WaterService {
  getWater(): string {
    return 'Hello Water API';
  }
}
