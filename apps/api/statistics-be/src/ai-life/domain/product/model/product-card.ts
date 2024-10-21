export class ProductCard {
  id: number;
  productId: number;
  title: string;
  imageUrl: string;
  cardMappedMediaId: number;
  description?: string;
  count?: number;
  percent?: number;

  constructor(props: ProductCard) {
    Object.assign(this, props);
  }
}
