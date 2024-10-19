import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountApplicationService } from '@/application/account/account.application.service';
import { AccountDomainService } from '@/domain/account/service/account.domain.service';
import { HashPasswordDomainService } from '@/domain/account/service/hash-password.domain.service';
import { HashPasswordEntity } from '@/infrastructure/account/entity/hash-password.entity';
import { RoleEntity } from '@/infrastructure/role/entity/role.entity';
import { AccountRoleEntity } from '@/infrastructure/account/entity/account-role.entity';
import { AccountEntity } from '@/infrastructure/account/entity/account.entity';
import { HashPasswordRepository } from '@/infrastructure/account/repository/hash-password.repository';
import { RoleRepository } from '@/infrastructure/role/repository/role.repository';
import { UserRoleRepository } from '@/infrastructure/account/repository/user-role.repository';
import { UserRepository } from '@/infrastructure/account/repository/user.repository';
import { AccountController } from '@/presentation/controller/account.controller';
import { ProjectModule } from './project.module';
import { RoleModule } from './role.module';
import { AuthModule } from './auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HashPasswordEntity,
      RoleEntity,
      AccountRoleEntity,
      AccountEntity,
    ]),
    forwardRef(() => ProjectModule),
    forwardRef(() => RoleModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AccountController],
  providers: [
    AccountApplicationService,
    AccountDomainService,
    HashPasswordDomainService,
    HashPasswordRepository,
    RoleRepository,
    UserRoleRepository,
    UserRepository,
    // WithdrawalUserRepository,
  ],
  exports: [AccountDomainService],
})
export class AccountModule {}
