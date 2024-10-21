import { StatisticsEnum } from '@/common/enum/statistics.enum';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

export class updateClickCountRequestDto {
  @IsEnum(StatisticsEnum)
  pageType: StatisticsEnum;
  @IsDate()
  @IsOptional()
  date?: Date;
}
