import { StatisticsService } from '@/statistics/elypecs/application/statistics.service';
import { StatisticsController } from '@/statistics/elypecs/presentation/controller/statistics.controller';
import { Module } from '@nestjs/common';
import { AuthModule } from '../../account/module/auth.module';

@Module({
  imports: [AuthModule],
  providers: [StatisticsService],
  controllers: [StatisticsController],
})
export class StatisticsModule {}
