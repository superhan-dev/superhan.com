import { Product } from '@/domain/samsung-ai-life/product/model/product';
import { ProductEntity } from '../entity/product.entity';

export class ProductMapper {
  static toDomain(entity: ProductEntity): Product {
    return new Product({
      id: entity.id,
      name: entity.name,
      imageUrl: entity.imageUrl,
      description: entity.description,
    });
  }
}
