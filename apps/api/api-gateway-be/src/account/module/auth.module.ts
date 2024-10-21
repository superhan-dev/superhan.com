import { AuthController } from '@/account/presentation/controller/auth.controller';
import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LoggerModule } from '../../module/logger.module';
import { AuthService } from '../application/auth.service';

import { AccountService } from '../application/account.service';
import { ProjectService } from '../application/project.service';
import { RoleService } from '../application/role.service';
import { AccountController } from '../presentation/controller/account.controller';
import { ProjectController } from '../presentation/controller/project.controller';
import { RoleController } from '../presentation/controller/role.controller';

@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
    }),
    LoggerModule,
  ],
  providers: [AccountService, ProjectService, RoleService, AuthService],
  controllers: [
    AuthController,
    ProjectController,
    RoleController,
    AccountController,
  ],
  exports: [AuthService],
})
export class AuthModule {}
