import { StatisticsEnum } from '@/common/enum/statistics.enum';

export class CreateClickLogInfoDto {
  type: StatisticsEnum;
  ip: string;
  device: string;
  url: string;
  id?: number;
  mediaId?: number;
  constructor(props: CreateClickLogInfoDto) {
    Object.assign(this, props);
  }
}
