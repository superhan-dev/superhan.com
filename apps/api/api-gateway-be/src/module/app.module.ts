import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { Module } from '@nestjs/common';
import { LoggerModule } from './logger.module';

import { ConfigModule } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from '../account/module/auth.module';
import { StatisticsModule } from '../statistics/module/statistics.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    LoggerModule,
    AuthModule,
    StatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
