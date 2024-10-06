import { forwardRef, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountApplicationService } from 'src/application/account/account.application.service';
import { LocalStrategy } from 'src/common/auth/local.strategy';
import { AccountDomainService } from 'src/domain/account/ account.domain.service';
import { HashPasswordDomainService } from 'src/domain/account/hash-password.domain.service';
import { HashPasswordEntity } from 'src/infrastructure/account/entity/hash-password.entity';
import { RoleEntity } from 'src/infrastructure/account/entity/role.entity';
import { UserProjectRoleEntity } from 'src/infrastructure/account/entity/user-project-role.entity';
import { UserEntity } from 'src/infrastructure/account/entity/user.entity';
import { HashPasswordRepository } from 'src/infrastructure/account/repository/hash-password.repository';
import { RoleRepository } from 'src/infrastructure/account/repository/role.repository';
import { UserProjectRoleRepository } from 'src/infrastructure/account/repository/user-project-role.repository';
import { UserRepository } from 'src/infrastructure/account/repository/user.repository';
import { AccountController } from 'src/presentation/controller/account.controller';
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
