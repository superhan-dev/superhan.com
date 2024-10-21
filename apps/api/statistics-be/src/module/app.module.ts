import { AiLifeModule } from '@/ai-life/module/ai-life.module';
import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import mysqlDbConfig from '@/common/config/db/mysql.db.config';
import { ElypecsModule } from '@/elypecs/module/elypecs.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from './logger.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [mysqlDbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: mysqlDbConfig,
    }),
    LoggerModule,
    AiLifeModule,
    ElypecsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
