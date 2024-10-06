import { RoleEnum } from 'src/common/enum/role.enum';

export class Role {
  roleId: number;
  roleName: RoleEnum;

  constructor(props: Role) {
    Object.assign(this, props);
  }
}
