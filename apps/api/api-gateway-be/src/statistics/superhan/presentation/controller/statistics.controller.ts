import { CustomAuthGuard } from '@/common/auth/guards/custom-auth.guard';
import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StatisticsService } from '../../application/superhan.statistics.service';

@Controller('api/statistics')
@UseGuards(CustomAuthGuard)
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @UseGuards(CustomAuthGuard)
  @Get('/page')
  getStatistics(@Req() req: any) {
    console.log(req.user);
  }
}
