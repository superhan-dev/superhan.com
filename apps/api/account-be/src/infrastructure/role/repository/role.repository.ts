import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/domain/role/model/role';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { RoleMapper } from '../mapper/role.mapper';
import { RoleEntity } from '../entity/role.entity';
import { CreateRoleRequestDto } from '@/presentation/dto/role/request/create-role.request.dto';
import { RoleEnum } from '@/common/enum/role.enum';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { UpdateRoleRequestDto } from '@/presentation/dto/role/request/update-role.request.dto';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create(dto: CreateRoleRequestDto): Promise<Role | undefined> {
    const roleEnumKey: keyof typeof RoleEnum =
      dto.roleName.toUpperCase() as keyof typeof RoleEnum;

    const result: RoleEntity | undefined = await this.repository.save({
      ...dto,
      roleName: RoleEnum[roleEnumKey],
    });

    return result ? RoleMapper.toDomain(result) : undefined;
  }

  async findAll() // TODO: pagination 추가할 것
  : Promise<Role[] | undefined> {
    const result: RoleEntity[] = await this.repository.find();

    return result ? RoleMapper.toDomainList(result) : undefined;
  }

  async update(dto: UpdateRoleRequestDto): Promise<boolean> {
    const roleEnumKey: keyof typeof RoleEnum =
      dto.roleName.toUpperCase() as keyof typeof RoleEnum;

    // 업데이트할 필드를 dto에서 가져와서 업데이트
    const updateData: Partial<RoleEntity> = {
      ...dto,
      roleName: RoleEnum[roleEnumKey],
    };

    // 업데이트 실행
    const result: UpdateResult = await this.repository.update(
      dto.id,
      updateData
    );

    if (!result.affected || result.affected <= 0) {
      throw new CustomException(ErrorEnum.ROLE_UPDATE_FAILED);
    }
    return result.affected > 0;
  }

  // 사용자 권한은 물리적 삭제
  async logicalDelete(id: number): Promise<boolean> {
    const result: UpdateResult = await this.repository.update(id, {
      isDeleted: true,
    });

    if (!result.affected || result.affected <= 0) {
      throw new CustomException(ErrorEnum.ROLE_DELETE_FAILED);
    }
    return result.affected > 0;
  }

  async findOneByRoleName(roleName: string): Promise<Role | undefined> {
    const entity = await this.dataSource
      .createQueryBuilder()
      .select('r')
      .from(RoleEntity, 'r')
      .where('r.role_name = :roleName', { roleName })
      .getOne();

    return entity ? RoleMapper.toDomain(entity) : undefined;
  }
}
