import { ProductStatistics } from '@/domain/samsung-ai-life/product/model/product-statistics';
import { ProductStatisticsTodayEntity } from '../entity/product-statistics-today.entity';

export class ProductStatisticsTodayMapper {
  static toDomain(entity: ProductStatisticsTodayEntity): ProductStatistics {
    return new ProductStatistics({
      type: entity.type,
      clickCount: entity.clickCount,
      productId: entity.productId,
      productMediaId: entity.productMediaId,
    });
  }
}
