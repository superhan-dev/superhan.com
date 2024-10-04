import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import * as winstonDaily from 'winston-daily-rotate-file';

import { Logger } from '@nestjs/common';
import { appendTimestamp, dailyOptions } from '@packages/winston-logger';
import { LoggerContext } from './common/constants/logger.constant';
import { GlobalExceptionFilter } from './common/filter/global-exception.filter';
import { AppModule } from './module/app.module';

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
  const logger = app.get(Logger);
  app.useGlobalFilters(new GlobalExceptionFilter(logger));
  // swagger 설정
  const config = new DocumentBuilder()
    .setTitle('Samsung AI Life API Documentation')
    .setDescription('The API description')
    .setVersion('1.0.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  const port = 3000;
  await app.listen(port, () => {
    logger.log('server running with port ' + port, LoggerContext.BOOTSTRAP);
  });
}
bootstrap();
