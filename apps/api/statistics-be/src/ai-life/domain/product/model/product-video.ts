export class ProductVideo {
  id: number;
  productId: number;
  title: string;
  description: string;
  url: string;
  count?: number;
  percent?: number;

  constructor(props: ProductVideo) {
    Object.assign(this, props);
  }
}
