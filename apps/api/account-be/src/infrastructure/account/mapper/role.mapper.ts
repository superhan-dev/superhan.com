import { Role } from 'src/domain/account/model/role';
import { RoleEntity } from '../entity/Role.entity';

export class RoleMapper {
  static toDomain(entity: RoleEntity) {
    return new Role({ roleId: entity.id, roleName: entity.roleName });
  }
}
