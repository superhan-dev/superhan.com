import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/domain/account/model/role';
import { DataSource, Repository } from 'typeorm';
import { RoleEntity } from '../entity/Role.entity';
import { RoleMapper } from '../mapper/role.mapper';

@Injectable()
export class RoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
    private readonly dataSource: DataSource
  ) {}

  // async findOneByRoleName(roleName: string): Promise<Role> {
  //   const entity: RoleEntity = await this.repository.findOne({
  //     where: {
  //       roleName: roleName,
  //     },
  //   });

  //   return RoleMapper.toDomain(entity);
  // }

  async findOneByRoleName(roleName: string): Promise<Role> {
    const entity = await this.dataSource
      .createQueryBuilder()
      .select('r')
      .from(RoleEntity, 'r')
      .where('r.role_name = :roleName', { roleName })
      .getOne();
    return RoleMapper.toDomain(entity);
  }
}
