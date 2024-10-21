import { Module } from '@nestjs/common';
import { StatisticsService } from '../application/statistics.service';
import { StatisticsController } from '../presentation/controller/statistics.controller';

@Module({
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class ElypecsModule {}
