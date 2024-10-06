import { RoleEnum } from 'src/common/enum/role.enum';
import { User } from './user';

export class Account extends User {
  project: string;
  password?: string;
  role?: RoleEnum;

  constructor(props: Partial<Account>) {
    super({
      userId: props.userId,
      username: props.username,
    });
    this.project = props.project;
    this.password = props.password;
    this.role = props.role;
  }
}
