import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { TypeOrmDbConfig } from '@/common/config/typeorm.db.config';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account.module';
import { LoggerModule } from './logger.module';
import { ProjectModule } from './project.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmDbConfig),
    LoggerModule,
    ProjectModule,
    forwardRef(() => AccountModule),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
