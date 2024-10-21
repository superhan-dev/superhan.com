import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from '../entity/product.entity';
import { Repository } from 'typeorm';
import { ProductMapper } from '../mapper/product.mapper';
import { Product } from '@/domain/samsung-ai-life/product/model/product';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>
  ) {}

  async findAll(): Promise<Product[]> {
    const products: ProductEntity[] = await this.productRepository.find();
    return products.map((product) => ProductMapper.toDomain(product));
  }
}
