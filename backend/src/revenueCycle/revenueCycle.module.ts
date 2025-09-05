import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RevenueCycle } from './revenueCycle.entity';
import { RevenueCycleService } from './revenueCycle.service';
import { RevenueCycleController } from './revenueCycle.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RevenueCycle])],
  providers: [RevenueCycleService],
  controllers: [RevenueCycleController],
})
export class RevenueCycleModule {}
