import { Injectable, Logger } from '@nestjs/common';
import { LoggerContext } from '../constants/logger.constant';

@Injectable()
export class CustomLogger extends Logger {
  private readonly logger: Logger;

  constructor() {
    super();
  }

  log(message: string, context: string) {
    this.logger.log(message, context ? context : LoggerContext.INFO);
  }

  error(message: string, trace: string) {
    this.logger.error(`${message} -> trace: ${trace}`, LoggerContext.ERROR);
  }

  warn(message: string) {
    this.logger.warn(message, LoggerContext.WARN);
  }

  debug(message: string) {
    this.logger.debug(message, LoggerContext.DEBUG);
  }

  verbose(message: string) {
    this.logger.verbose(message, LoggerContext.VERBOSE);
  }
}
