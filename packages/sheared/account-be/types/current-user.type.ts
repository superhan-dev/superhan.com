import { RoleEnum } from 'account-be/enum';

export type CurrentUserType = {
  accountId: number;
  projectName: string;
  roleName: RoleEnum;
};
