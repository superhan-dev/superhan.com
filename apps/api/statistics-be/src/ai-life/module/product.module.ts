import { forwardRef, Module } from '@nestjs/common';

import { LoggerModule } from '@/module/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductFacade } from '../application/product.facade';
import { ProductStatisticsHelper } from '../domain/product/product-statistics.helper';
import { ProductService } from '../domain/product/product.service';
import { ProductLogEntity } from '../infrastructure/product/entity/product-log.entity';
import { ProductMediaEntity } from '../infrastructure/product/entity/product-media.entity';
import { ProductStatisticsPastEntity } from '../infrastructure/product/entity/product-statistics-past.entity';
import { ProductStatisticsTodayEntity } from '../infrastructure/product/entity/product-statistics-today.entity';
import { ProductEntity } from '../infrastructure/product/entity/product.entity';
import { ProductLogRepository } from '../infrastructure/product/repository/product-log.repository';
import { ProductMediaRepository } from '../infrastructure/product/repository/product-media-repository.service';
import { ProductStatisticsPastRepository } from '../infrastructure/product/repository/product-statistics-past.repository';
import { ProductStatisticsTodayRepository } from '../infrastructure/product/repository/product-statistics-today.repository';
import { ProductRepository } from '../infrastructure/product/repository/product.repository';
import { ProductController } from '../presentation/controller/product.controller';
import { StatisticsController } from '../presentation/controller/statistics.controller';
import { StatisticsModule } from './statistics.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ProductEntity,
      ProductLogEntity,
      ProductMediaEntity,
      ProductStatisticsPastEntity,
      ProductStatisticsTodayEntity,
    ]),
    forwardRef(() => StatisticsModule),
    LoggerModule,
  ],
  controllers: [ProductController, StatisticsController],
  providers: [
    ProductFacade,
    ProductService,
    ProductRepository,
    ProductLogRepository,
    ProductMediaRepository,
    ProductStatisticsPastRepository,
    ProductStatisticsTodayRepository,
    ProductStatisticsHelper,
  ],
  exports: [ProductFacade],
})
export class ProductModule {}
