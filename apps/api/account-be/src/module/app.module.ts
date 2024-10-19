import { AppController } from '@/app.controller';
import { AppService } from '@/app.service';
import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountModule } from './account.module';
import { LoggerModule } from './logger.module';
import { ProjectModule } from './project.module';
import { AuthModule } from './auth.module';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import mysqlDbConfig from '@/common/config/db/mysql.db.config';
import jwtAuthConfig from '@/common/config/auth/jwt.auth.config';
import refreshJwtAuthConfig from '@/common/config/auth/refresh-jwt.auth.config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtAuthConfig, refreshJwtAuthConfig, mysqlDbConfig],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: mysqlDbConfig,
    }),
    LoggerModule,
    ProjectModule,
    forwardRef(() => AccountModule),
    forwardRef(() => AuthModule),
    forwardRef(() => ProjectModule),
  ],
  controllers: [AppController],
  providers: [AppService, JwtService],
})
export class AppModule {}
