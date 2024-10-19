import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from '@/presentation/controller/auth.controller';
import { AuthApplicationService } from '@/application/auth/auth.application.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import jwtConfig from '@/common/config/auth/jwt.auth.config';
import { ConfigModule } from '@nestjs/config';
import { LocalStrategy } from '@/common/auth/strategies/local.strategy';
import refreshJwtConfig from '@/common/config/auth/refresh-jwt.auth.config';
import { JwtStrategy } from '@/common/auth/strategies/jwt.strategy';
import { RefreshJwtStrategy } from '@/common/auth/strategies/refresh-jwt.strategy';
import { AuthDomainService } from '@/domain/auth/auth.domain.service';
import { AccountModule } from './account.module';
import { ProjectModule } from './project.module';
import { RoleModule } from './role.module';
import { ProjectEntity } from '@/infrastructure/project/entity/project.entity';
import { PassportModule } from '@nestjs/passport';
import { LoggerModule } from './logger.module';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([ProjectEntity]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    ConfigModule.forFeature(jwtConfig),
    ConfigModule.forFeature(refreshJwtConfig),
    forwardRef(() => AccountModule),
    forwardRef(() => ProjectModule),
    forwardRef(() => RoleModule),
    forwardRef(() => LoggerModule),
  ],
  controllers: [AuthController],

  providers: [
    AuthApplicationService,
    AuthDomainService,
    LocalStrategy,
    JwtStrategy,
    RefreshJwtStrategy,
    // {
    //   provide: APP_GUARD,
    //   useClass: JwtAuthGuard,
    // },
    // { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class AuthModule {}
