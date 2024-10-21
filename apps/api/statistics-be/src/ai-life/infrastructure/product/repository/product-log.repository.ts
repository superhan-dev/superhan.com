import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductLogEntity } from '../entity/product-log.entity';
import { Repository } from 'typeorm';
import { Builder } from 'builder-pattern';
import { CreateClickLogInfoDto } from '@/application/samsung-ai-life/dto/create-click-log.info.dto';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { CustomException } from '@/common/exception/custom.exception';
import { ProductStatistics } from '@/domain/samsung-ai-life/product/model/product-statistics';

@Injectable()
export class ProductLogRepository {
  constructor(
    @InjectRepository(ProductLogEntity)
    private readonly repository: Repository<ProductLogEntity>
  ) {}

  async createClickLog(request: CreateClickLogInfoDto) {
    const entity = Builder<ProductLogEntity>()
      .productId(request.id!)
      .productMediaId(request.mediaId!)
      .type(request.type)
      .apiUrl(request.url)
      .deviceType(request.device)
      .ipAddress(request.ip)
      .build();
    const result = await this.repository.save(entity);

    if (!result) throw new CustomException(ErrorEnum.LOG_CREATE_FAILED);

    return true;
  }

  async countClicksAfterGivenDate(date: Date): Promise<ProductStatistics[]> {
    const formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
    const logs = await this.repository
      .createQueryBuilder('log')
      .select('log.type', 'type')
      .addSelect('log.product_id', 'productId')
      .addSelect('log.product_media_id', 'productMediaId')
      .addSelect('count(log.id)', 'clickCount')
      .where('log.created_at > :date', { date: formattedDate })
      .groupBy('log.TYPE')
      .addGroupBy('log.product_id')
      .addGroupBy('log.product_media_id')
      .getRawMany();

    return logs.map((log) => {
      log.clickCount = Number(log.clickCount);
      log.productId = log.productId ? Number(log.productId) : null;
      log.productMediaId = log.productMediaId
        ? Number(log.productMediaId)
        : null;
      return new ProductStatistics({
        type: log.type,
        clickCount: log.clickCount,
        productId: log.productId,
        productMediaId: log.productMediaId,
      });
    });
  }

  async findOneByProductId(
    productId: number
  ): Promise<ProductLogEntity | null> {
    const log = await this.repository.findOne({
      where: { productId },
    });

    if (!log) {
      throw new CustomException(ErrorEnum.LOG_NOT_FOUND);
    }

    return log;
  }
}
