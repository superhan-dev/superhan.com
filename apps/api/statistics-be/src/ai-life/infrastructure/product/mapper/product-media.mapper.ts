import { ProductCard } from '@/ai-life/domain/product/model/product-card';
import { ProductMediaEntity } from '../entity/product-media.entity';
import { ProductVideo } from '@/ai-life/domain/product/model/product-video';

export class ProductMediaMapper {
  static toCardDomain(entity: ProductMediaEntity) {
    return new ProductCard({
      id: entity.id,
      productId: entity.productId,
      title: entity.title,
      imageUrl: entity.url,
      cardMappedMediaId: entity.cardMappedMediaId,
      description: entity.description || '',
    });
  }

  static toVideoDomain(entity: ProductMediaEntity) {
    return new ProductVideo({
      id: entity.id,
      productId: entity.productId,
      title: entity.title,
      description: entity.description,
      url: entity.url,
    });
  }
}
