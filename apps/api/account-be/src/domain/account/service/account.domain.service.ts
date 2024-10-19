import { Injectable } from '@nestjs/common';
import { AccountDto } from '@/application/dto/account.dto';
import { CustomException } from '@/common/exception/custom.exception';
import { RoleRepository } from '@/infrastructure/role/repository/role.repository';
import { ProjectRepository } from '@/infrastructure/project/repository/project.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword } from '@/common/helpers/encrypt.helper';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { HashPasswordEntity } from '@/infrastructure/account/entity/hash-password.entity';
import { AccountRoleEntity } from '@/infrastructure/account/entity/account-role.entity';
import { AccountEntity } from '@/infrastructure/account/entity/account.entity';
import { AccountMapper } from '@/infrastructure/account/mapper/account.mapper';
import { DataSource, Repository } from 'typeorm';
import { Project } from '../../project/model/project';
import { Account } from '../model/account';
import { Role } from '../../role/model/role';
import { ProjectEntity } from '@/infrastructure/project/entity/project.entity';
import { RoleEntity } from '@/infrastructure/role/entity/role.entity';

@Injectable()
export class AccountDomainService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly dataSource: DataSource,
    @InjectRepository(AccountEntity)
    private readonly accountRepository: Repository<AccountEntity>,
    @InjectRepository(HashPasswordEntity)
    private readonly hashPasswordRepository: Repository<HashPasswordEntity>,
    @InjectRepository(AccountRoleEntity)
    private readonly accountRoleRepository: Repository<AccountRoleEntity>
  ) {}

  async createAccount(dto: AccountDto): Promise<boolean | CustomException> {
    let role: Role | undefined;
    if (dto.roleName) {
      role = await this.roleRepository.findOneByRoleName(dto.roleName);
    }
    if (!role) {
      throw new CustomException(ErrorEnum.ROLE_NOT_FOUND);
    }

    const project: Project | undefined =
      await this.projectRepository.findOneByProjectName(dto.projectName);
    if (!project) {
      throw new CustomException(ErrorEnum.PROJECT_NOT_FOUND);
    }

    const existedUser: AccountEntity | null = await this.dataSource
      .createQueryBuilder()
      .select('ac')
      .from(AccountEntity, 'ac')
      .where('ac.username = :username', { username: dto.username })
      .andWhere('ac.project_id = :projectId', {
        projectId: project.id,
      })
      .getOne();

    if (existedUser) {
      throw new CustomException(ErrorEnum.USER_ALREADY_EXIST);
    }

    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const userEntity = this.accountRepository.create({
        username: dto.username,
        projectId: project.id,
      });
      const createdUserEntity: AccountEntity =
        await queryRunner.manager.save(userEntity);
      const user: Account = AccountMapper.toDomain(createdUserEntity);
      if (!user) {
        throw new CustomException(ErrorEnum.USER_CREATE_FAILED);
      }
      const { salt, hash } = hashPassword(dto.password);

      const hashPasswordEntity = this.hashPasswordRepository.create({
        accountId: user.accountId,
        password: hash,
        salt,
      });

      // insert 메서드를 사용하여 엔티티 삽입
      const insertResult = await queryRunner.manager.insert(
        HashPasswordEntity,
        hashPasswordEntity
      );

      // 삽입 결과를 확인하고, 삽입된 행이 없으면 예외 발생
      if (!insertResult || insertResult.identifiers.length === 0) {
        throw new CustomException(ErrorEnum.HASH_PASSWORD_CREATE_FAILED);
      }
      const userRole = this.accountRoleRepository.create({
        roleId: role.id,
        accountId: user.accountId,
      });
      const insertUserRole = await queryRunner.manager.insert(
        AccountRoleEntity,
        userRole
      );

      if (!insertUserRole || insertResult.identifiers.length === 0) {
        throw new CustomException(ErrorEnum.INSERT_DATA_FAILED);
      }
      await queryRunner.commitTransaction();
      return true;
    } catch (error) {
      await queryRunner.rollbackTransaction(); // 트랜잭션 롤백

      return error;
    } finally {
      await queryRunner.release();
    }
  }

  async findOneByUsername(username: string): Promise<Account | undefined> {
    const account: AccountEntity | null = await this.dataSource
      .createQueryBuilder()
      .select('u')
      .from(AccountEntity, 'u')
      .where('u.username = :username', { username: username })
      .getOne();

    return account ? AccountMapper.toDomain(account) : undefined;
  }

  async findOneByAccountId(accountId: number): Promise<Account | undefined> {
    const accountProject = await this.dataSource
      .getRepository(AccountEntity)
      .createQueryBuilder('ac')
      .innerJoin(ProjectEntity, 'pr', 'ac.project_id = pr.id')
      .select([
        'ac.id AS accountId',
        'ac.username AS username',
        'pr.id AS projectId',
        'pr.projectName AS projectName',
      ])
      .where('ac.id = :id', { id: accountId })
      .getRawOne();

    const accountRole = await this.dataSource
      .getRepository(AccountRoleEntity)
      .createQueryBuilder('account_role')
      .innerJoin(RoleEntity, 'role', 'account_role.role_id = role.id')
      .select(['role.role_name AS roleName'])
      .where('account_role.account_id = :accountId', { accountId: accountId })
      .getRawOne();

    const result: Account = {
      accountId: accountProject?.accountId,
      username: accountProject?.username,
      projectName: accountProject?.projectName,
      roleName: accountRole.roleName,
    };

    return result;
  }
}
