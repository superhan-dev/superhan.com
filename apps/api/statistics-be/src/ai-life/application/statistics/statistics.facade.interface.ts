import { CreateClickLogInfoDto } from '../samsung-ai-life/dto/create-click-log.info.dto';
import { StatisticsWithRangeResponseDto } from '../../presentation/samsung-ai-life/dto/statistics/response/statistics-with-range-response.dto';
import { StatisticsSortEnum } from '@/common/enum/statistics-sort.enum';

export interface StatisticsFacadeInterface {
  countPageClick(): Promise<number>;

  createClickLog(request: CreateClickLogInfoDto): Promise<boolean>;

  updateClickCountAfterGivenDate(date: Date): Promise<boolean>;

  statisticsWithTimeRange(
    start: Date,
    end: Date,
    type: StatisticsSortEnum
  ): Promise<StatisticsWithRangeResponseDto[]>;

  countPageClickWithTimeRange(start: Date, end: Date): Promise<number>;

  updateStatisticsDaily(): Promise<void>;

  updateClickCountAfterGivenDate(date: Date): Promise<boolean>;
}
