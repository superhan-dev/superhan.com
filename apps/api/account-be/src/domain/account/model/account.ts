import { RoleEnum } from '@/common/enum/role.enum';

export class Account {
  accountId: number;
  username: string;

  projectName?: string;
  password?: string;
  roleName?: RoleEnum;

  constructor(props: Account) {
    this.accountId = props.accountId!;
    this.username = props.username!;
    this.projectName = props.projectName!;
    this.password = props.password;
    this.roleName = props.roleName;
  }
}
