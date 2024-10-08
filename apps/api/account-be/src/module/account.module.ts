import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountApplicationService } from '@/application/account/account.application.service';
import { LocalStrategy } from '@/common/auth/local.strategy';
import { AccountDomainService } from '@/domain/account/ account.domain.service';
import { HashPasswordDomainService } from '@/domain/account/hash-password.domain.service';
import { HashPasswordEntity } from '@/infrastructure/account/entity/hash-password.entity';
import { RoleEntity } from '@/infrastructure/account/entity/role.entity';
import { UserProjectRoleEntity } from '@/infrastructure/account/entity/user-project-role.entity';
import { UserEntity } from '@/infrastructure/account/entity/user.entity';
import { HashPasswordRepository } from '@/infrastructure/account/repository/hash-password.repository';
import { RoleRepository } from '@/infrastructure/account/repository/role.repository';
import { UserProjectRoleRepository } from '@/infrastructure/account/repository/user-project-role.repository';
import { UserRepository } from '@/infrastructure/account/repository/user.repository';
import { AccountController } from '@/presentation/controller/account.controller';
import { ProjectModule } from './project.module';

@Module({
  imports: [
    forwardRef(() => PassportModule),
    TypeOrmModule.forFeature([
      HashPasswordEntity,
      RoleEntity,
      UserProjectRoleEntity,
      UserEntity,
    ]),
    forwardRef(() => ProjectModule),
  ],
  controllers: [AccountController],
  providers: [
    AccountApplicationService,
    AccountDomainService,
    HashPasswordDomainService,
    LocalStrategy,
    HashPasswordRepository,
    RoleRepository,
    UserProjectRoleRepository,
    UserRepository,
    // WithdrawalUserRepository,
  ],
})
export class AccountModule {}
