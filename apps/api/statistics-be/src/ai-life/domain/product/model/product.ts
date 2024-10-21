export class Product {
  id: number;
  name: string;
  imageUrl: string;
  description?: string;
  count?: number;
  percent?: number;

  constructor(props: Product) {
    Object.assign(this, props);
  }
}
