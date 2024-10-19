import { RoleEnum } from '@/common/enum/role.enum';
import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: [RoleEnum, ...RoleEnum[]]) =>
  SetMetadata(ROLES_KEY, roles);
