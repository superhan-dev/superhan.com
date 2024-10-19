import { HashPasswordEntity } from '@/infrastructure/account/entity/hash-password.entity';
import { LoginRequestDto } from '@/presentation/dto/auth/request/login.request.dto';
import { Injectable } from '@nestjs/common';
import { AccountDomainService } from '../account/service/account.domain.service';
import { DataSource } from 'typeorm';
import { Account } from '../account/model/account';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { CustomException } from '@/common/exception/custom.exception';
import { verifyPassword } from '@/common/helpers/encrypt.helper';
import { Project } from '../project/model/project';
import { ProjectRepository } from '@/infrastructure/project/repository/project.repository';
import { AccountRoleEntity } from '@/infrastructure/account/entity/account-role.entity';
import { RoleEntity } from '@/infrastructure/role/entity/role.entity';

@Injectable()
export class AuthDomainService {
  constructor(
    private readonly dataSource: DataSource,
    private readonly projectRepository: ProjectRepository,
    private readonly accountDomainService: AccountDomainService
  ) {}

  async validateAccount(dto: LoginRequestDto): Promise<Account> {
    const user = await this.accountDomainService.findOneByUsername(
      dto.username
    );
    if (!user) {
      throw new CustomException(ErrorEnum.USER_NOT_FOUND);
    }

    const hashPassword: HashPasswordEntity | null = await this.dataSource
      .createQueryBuilder()
      .select('hp')
      .from(HashPasswordEntity, 'hp')
      .where('hp.account_id = :accountId', { accountId: user.accountId })
      .getOne();

    if (!hashPassword) {
      throw new CustomException(ErrorEnum.INVALIDATED_ACCOUNT);
    }

    const isValidatePassword: boolean = verifyPassword(
      dto.password,
      hashPassword.password,
      hashPassword.salt
    );

    if (!isValidatePassword) {
      throw new CustomException(ErrorEnum.HASH_PASSWORD_NOT_FOUND);
    }

    // project 확인
    const project: Project | undefined =
      await this.projectRepository.findOneByProjectName(dto.projectName);

    if (!project) {
      throw new CustomException(ErrorEnum.PROJECT_NOT_FOUND);
    }

    const role: RoleEntity | null = await this.dataSource
      .createQueryBuilder()
      .select('r')
      .from(RoleEntity, 'r')
      .where('r.role_name = :roleName', { roleName: dto.roleName })
      .andWhere('r.is_deleted = :isDeleted', { isDeleted: false })
      .getOne();

    if (!role) {
      throw new CustomException(ErrorEnum.ROLE_NOT_FOUND);
    }

    const userProjectRole: AccountRoleEntity | null = await this.dataSource
      .createQueryBuilder()
      .select('ur')
      .from(AccountRoleEntity, 'ur')
      .where('ur.account_id = :accountId', { accountId: user.accountId })
      .andWhere('ur.role_id = :roleId', { roleId: role.id })
      .getOne();

    if (!userProjectRole) {
      throw new CustomException(ErrorEnum.INVALIDATED_ACCOUNT);
    }

    return {
      accountId: user.accountId,
      username: user.username,
      projectName: project.projectName,
      roleName: role.roleName,
    };
  }
}
