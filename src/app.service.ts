import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { message: String } {
    return {
      message: 'Welcome to the City API!',
    };
  }
}
