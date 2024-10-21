import { StatisticsController } from '@/ai-life/presentation/controller/statistics.controller';
import { Module } from '@nestjs/common';
import { PackageModule } from './package.module';
import { ProductModule } from './product.module';
import { StatisticsModule } from './statistics.module';

@Module({
  imports: [PackageModule, ProductModule, StatisticsModule],
  providers: [],
  controllers: [StatisticsController],
})
export class AiLifeModule {}
