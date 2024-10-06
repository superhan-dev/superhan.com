import { Injectable, Logger } from '@nestjs/common';
import { LoggerContextEnum } from '../enum/logger.constant';

@Injectable()
export class CustomLogger extends Logger {
  private readonly logger: Logger;

  constructor() {
    super();
  }

  log(message: string, context: string) {
    this.logger.log(message, context ? context : LoggerContextEnum.INFO);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} -> trace: ${trace}`, LoggerContextEnum.ERROR);
  }

  warn(message: string) {
    this.logger.warn(message, LoggerContextEnum.WARN);
  }

  debug(message: string) {
    this.logger.debug(message, LoggerContextEnum.DEBUG);
  }

  verbose(message: string) {
    this.logger.verbose(message, LoggerContextEnum.VERBOSE);
  }
}
