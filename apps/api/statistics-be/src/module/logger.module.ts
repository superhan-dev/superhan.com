import { CustomLogger } from '@/common/logger/custom-logger';
import { Logger, Module } from '@nestjs/common';

@Module({
  providers: [CustomLogger, Logger],
  exports: [Logger],
})
export class LoggerModule {}
