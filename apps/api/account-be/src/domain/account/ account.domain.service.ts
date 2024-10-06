import { Injectable } from '@nestjs/common';
import { AccountDto } from 'src/application/dto/account.dto';
import { CustomException } from 'src/common/exception/custom.exception';
import { RoleRepository } from 'src/infrastructure/account/repository/role.repository';
import { ProjectRepository } from 'src/infrastructure/project/repository/project.repository';
// import { DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { hashPassword, verifyPassword } from 'src/common/auth/encrypt.helper';
import { ErrorEnum } from 'src/common/exception/data/error.enum';
import { HashPasswordEntity } from 'src/infrastructure/account/entity/hash-password.entity';
import { RoleEntity } from 'src/infrastructure/account/entity/Role.entity';
import { UserProjectRoleEntity } from 'src/infrastructure/account/entity/user-project-role.entity';
import { UserEntity } from 'src/infrastructure/account/entity/user.entity';
import { UserMapper } from 'src/infrastructure/account/mapper/user.mapper';
import { DataSource, Repository } from 'typeorm';
import { Project } from '../project/model/project';
import { Account } from './model/account';
import { Role } from './model/role';
import { User } from './model/user';

@Injectable()
export class AccountDomainService {
  constructor(
    private readonly roleRepository: RoleRepository,
    private readonly projectRepository: ProjectRepository,
    private readonly dataSource: DataSource,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(HashPasswordEntity)
    private readonly hashPasswordRepository: Repository<HashPasswordEntity>,
    @InjectRepository(UserProjectRoleEntity)
    private readonly userProjectRoleRepository: Repository<UserProjectRoleEntity>
  ) {}

  async create(dto: AccountDto): Promise<boolean | CustomException> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const existedUserEntity = await this.dataSource
        .createQueryBuilder()
        .select('u')
        .from(UserEntity, 'u')
        .where('u.username = :username', { username: dto.username })
        .getOne();

      if (existedUserEntity) {
        throw new CustomException(ErrorEnum.USER_ALREADY_EXIST);
      }

      const userEntity = this.userRepository.create({ username: dto.username });
      const createdUserEntity: UserEntity =
        await queryRunner.manager.save(userEntity);
      const user: User = UserMapper.toDomain(createdUserEntity);
      if (!user) {
        throw new CustomException(ErrorEnum.USER_CREATE_FAILED);
      }
      const { salt, hash } = hashPassword(dto.password);

      const hashPasswordEntity = this.hashPasswordRepository.create({
        userId: user.userId,
        password: hash,
        salt,
      });
      const createdPasswordEntity: HashPasswordEntity =
        await queryRunner.manager.save(hashPasswordEntity);

      if (!createdPasswordEntity) {
        throw new CustomException(ErrorEnum.HASH_PASSWORD_CREATE_FAILED);
      }

      let role: Role;
      if (dto.roleName) {
        role = await this.roleRepository.findOneByRoleName(dto.roleName);
      }
      if (!role) {
        throw new CustomException(ErrorEnum.ROLE_NOT_FOUND);
      }

      const project: Project =
        await this.projectRepository.findOneByProjectName(dto.projectName);
      if (!project) {
        throw new CustomException(ErrorEnum.PROJECT_CREATE_FAILED);
      }

      const userProjectRoleRepository = this.userProjectRoleRepository.create({
        roleId: role.roleId,
        userId: user.userId,
        projectId: project.id,
      });
      const createdUserProjectRoleRepository: UserProjectRoleEntity =
        await queryRunner.manager.save(userProjectRoleRepository);

      if (!createdUserProjectRoleRepository) {
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

  async validateAccount(dto: AccountDto): Promise<Account> {
    const user = await this.findOneByUsername(dto.username);
    if (!user) {
      throw new CustomException(ErrorEnum.USER_NOT_FOUND);
    }

    const hashPassword: HashPasswordEntity = await this.dataSource
      .createQueryBuilder()
      .select('hp')
      .from(HashPasswordEntity, 'hp')
      .where('hp.user_id = :userId', { userId: user.userId })
      .getOne();

    const isValidatePassword: boolean = verifyPassword(
      dto.password,
      hashPassword.password,
      hashPassword.salt
    );

    if (!isValidatePassword) {
      throw new CustomException(ErrorEnum.HASH_PASSWORD_NOT_FOUND);
    }

    // project 확인
    const project: Project = await this.projectRepository.findOneByProjectName(
      dto.projectName
    );

    if (!project) {
      throw new CustomException(ErrorEnum.PROJECT_NOT_FOUND);
    }

    const role: RoleEntity = await this.dataSource
      .createQueryBuilder()
      .select('r')
      .from(RoleEntity, 'r')
      .where('r.role_name = :roleName', { roleName: dto.roleName })
      .getOne();

    const userProjectRole: UserProjectRoleEntity = await this.dataSource
      .createQueryBuilder()
      .select('upr')
      .from(UserProjectRoleEntity, 'upr')
      .where('upr.user_id = :userId', { userId: user.userId })
      .andWhere('upr.project_id = :projectId', { projectId: project.id })
      .andWhere('upr.role_id = :roleId', { roleId: role.id })
      .getOne();

    if (!userProjectRole) {
      throw new CustomException(ErrorEnum.INVALIDATED_ACCOUNT);
    }

    return {
      userId: user.userId,
      username: user.username,
      project: project.name,
      role: role.roleName,
    };
  }

  async findOneByUsername(username: string): Promise<User> {
    const user = await this.dataSource
      .createQueryBuilder()
      .select('u')
      .from(UserEntity, 'u')
      .where('u.username = :username', { username: username })
      .getOne();

    return UserMapper.toDomain(user);
  }
}
