import { RoleEnum } from 'account-be/enum/role.enum';

export class RoleModel {
  id: number;
  roleName: RoleEnum;

  constructor(props: RoleModel) {
    Object.assign(this, props);
  }
}
