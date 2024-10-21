import { StatisticsEnum } from '@/common/enum/statistics.enum';

export class CreateClickLogRequestDto {
  pageType: StatisticsEnum.PRODUCT | StatisticsEnum.PACKAGE;
  type: StatisticsEnum;
  id?: number;
  mediaId?: number;

  constructor(props: CreateClickLogRequestDto) {
    Object.assign(this, props);
  }
}
