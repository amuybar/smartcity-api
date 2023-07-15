import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CommonModule } from './common/common.module';
import { TrafficModule } from './traffic/traffic.module';
import { WasteModule } from './waste/waste.module';
import { WaterModule } from './water/water.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    CommonModule,
    TrafficModule,
    WasteModule,
    WaterModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
