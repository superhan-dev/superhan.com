import { NestFactory } from '@nestjs/core';
import { AppModule } from './module/app.module';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';
import { appendTimestamp, dailyOptions } from '@configs/winston-logger';
import { Logger } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { setupSwagger } from './common/helpers/swagger.helper';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          level: process.env.NODE_ENV === 'production' ? 'http' : 'debug',
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.colorize(),
            appendTimestamp({ tz: 'Asia/Seoul' }),
            winston.format.json(),
            winston.format.simple(),
            winston.format.printf((info) => {
              return `[${info.timestamp}][${info.context}] ${info.level}: ${info.message}`;
            })
          ),
        }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winstonDaily(dailyOptions('info')),
        new winstonDaily(dailyOptions('error')),
        new winstonDaily(dailyOptions('fatal')),
      ],
    }),
  });

  app.enableCors();
  app.use(cookieParser());
  const logger = app.get(Logger);
  // globalExceptionFilter 둥록
  app.useGlobalFilters(new GlobalExceptionFilter(logger));

  setupSwagger(app);
  const port = 8080;
  await app.listen(port, () => {
    logger.log('server running with port ' + port, 'Bootstrap');
  });
}

bootstrap();
