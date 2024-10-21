import { Controller, Get } from '@nestjs/common';

@Controller()
export class StatisticsController {
  @Get()
  getStatistics() {
    return 'elypecs statistics';
  }
}
