import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PackageFacade } from '../application/package.facade';
import { ProductFacade } from '../application/product.facade';

@Injectable()
export class StatisticsScheduler {
  constructor(
    private readonly productFacade: ProductFacade,
    private readonly packageFacade: PackageFacade
  ) {}

  @Cron('*/10 * * * *')
  async updateProductStatistics() {
    await this.productFacade.updateClickCountAfterGivenDate(
      this.getDateTenMinutesAgo()
    );
  }

  @Cron('*/10 * * * *')
  async updatePackageStatistics() {
    await this.packageFacade.updateClickCountAfterGivenDate(
      this.getDateTenMinutesAgo()
    );
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updatePastProductStatistics() {
    await this.productFacade.updateStatisticsDaily();
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async updatePastPackageStatistics() {
    await this.packageFacade.updateStatisticsDaily();
  }

  private getDateTenMinutesAgo(): Date {
    const tenMinutesAgo = new Date();
    tenMinutesAgo.setMinutes(tenMinutesAgo.getMinutes() - 10);
    return tenMinutesAgo;
  }
}
