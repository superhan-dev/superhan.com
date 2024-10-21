import { Role } from '@/domain/role/model/role';
import { RoleEntity } from '../entity/role.entity';

export class RoleMapper {
  static toDomain(entity: RoleEntity) {
    return new Role({ id: entity.id, roleName: entity.roleName });
  }
  static toDomainList(entityList: RoleEntity[]) {
    return entityList.map((entity) => new Role(entity));
  }
}
