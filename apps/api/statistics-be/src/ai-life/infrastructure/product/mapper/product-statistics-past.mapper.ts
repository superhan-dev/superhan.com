import { ProductStatistics } from '@/domain/samsung-ai-life/product/model/product-statistics';
import { ProductStatisticsPastEntity } from '../entity/product-statistics-past.entity';

export class ProductStatisticsPastMapper {
  static toDomain(entity: ProductStatisticsPastEntity): ProductStatistics {
    return new ProductStatistics({
      type: entity.type,
      clickCount: entity.clickCount,
      productId: entity.productId,
      productMediaId: entity.productMediaId,
    });
  }
}
