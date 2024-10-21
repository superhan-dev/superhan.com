import { StatisticsEnum } from '../../../../common/enum/statistics.enum';

export class ProductLog {
  public type: StatisticsEnum;
  public url: string;
  public ip: string;
  public device: string;
  public productId?: number;
  public productMediaId?: number;
  constructor(props: ProductLog) {
    Object.assign(this, props);
  }
}
