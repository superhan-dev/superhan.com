import { RoleEnum } from '@/common/enum/role.enum';

export type CurrentUser = {
  accountId: number;
  projectName: string;
  roleName: RoleEnum;
};
