import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '@packages/sheared';

export const ROLES_KEY = 'roles';
export const RequireRoles = (...roles: [RoleEnum, ...RoleEnum[]]) =>
  SetMetadata(ROLES_KEY, roles);
