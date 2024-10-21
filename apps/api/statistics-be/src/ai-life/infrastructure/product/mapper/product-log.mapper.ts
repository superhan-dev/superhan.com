import { ProductLog } from '@/domain/samsung-ai-life/product/model/product-log';
import { ProductLogEntity } from '../entity/product-log.entity';

export class ProductLogMapper {
  static toDomain(entity: ProductLogEntity): ProductLog {
    return new ProductLog({
      type: entity.type,
      url: entity.apiUrl,
      ip: entity.ipAddress,
      device: entity.deviceType,
      productId: entity.productId,
      productMediaId: entity.productMediaId,
    });
  }
}
