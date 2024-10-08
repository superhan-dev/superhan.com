import { Logger, Module } from '@nestjs/common';
import { CustomLogger } from '@/common/logger/custom.logger';

@Module({
  providers: [CustomLogger, Logger],
})
export class LoggerModule {}
