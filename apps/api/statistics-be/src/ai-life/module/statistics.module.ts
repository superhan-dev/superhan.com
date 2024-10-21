import { forwardRef, Module } from '@nestjs/common';
import { StatisticsFacadeFactory } from '../application/statistics/statistics.facade.factory';
import { PackageModule } from './package.module';
import { ProductModule } from './product.module';

@Module({
  imports: [forwardRef(() => ProductModule), forwardRef(() => PackageModule)],
  providers: [StatisticsFacadeFactory],
  exports: [StatisticsFacadeFactory],
})
export class StatisticsModule {}
