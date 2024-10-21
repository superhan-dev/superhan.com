import { StatisticsService } from '@/elypecs/application/statistics.service';
import { StatisticsDomainService } from '@/elypecs/domain/statistics.domain.service';
import { StatisticsController } from '@/elypecs/presentation/controller/statistics.controller';
import { Module } from '@nestjs/common';

@Module({
  providers: [StatisticsDomainService, StatisticsService],
  controllers: [StatisticsController],
})
export class ElypecsModule {}
