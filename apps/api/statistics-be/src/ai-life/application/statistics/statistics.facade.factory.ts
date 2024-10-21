import { Injectable } from '@nestjs/common';
import { ProductFacade } from '../samsung-ai-life/product.facade';
import { PackageFacade } from '../samsung-ai-life/package.facade';
import { CustomException } from '../../common/exception/custom.exception';
import { StatisticsEnum } from '@/common/enum/statistics.enum';
import { ErrorEnum } from '@/common/exception/data/error.enum';

@Injectable()
export class StatisticsFacadeFactory {
  constructor(
    private readonly productFacade: ProductFacade,
    private readonly packageFacade: PackageFacade
  ) {}

  getFacade(type: string) {
    if (type == StatisticsEnum.PRODUCT) return this.productFacade;
    else if (type == StatisticsEnum.PACKAGE) return this.packageFacade;
    else throw new CustomException(ErrorEnum.BAD_REQUEST);
  }
}
