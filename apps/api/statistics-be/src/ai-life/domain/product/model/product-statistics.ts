import { StatisticsEnum } from '../../../../common/enum/statistics.enum';

export class ProductStatistics {
  type: StatisticsEnum;
  clickCount: number;
  productId: number;
  productMediaId: number;
  rankCount?: number;

  constructor(props: ProductStatistics) {
    Object.assign(this, {
      ...props,
      productId: props.productId!,
      productMediaId: props.productMediaId!,
      rankCount: props.rankCount || 0,
    });
  }
}
