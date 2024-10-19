import { RoleEnum } from '@/common/enum/role.enum';

export type CurrentUser = {
  accountId: number;
  roleName: RoleEnum;
};
