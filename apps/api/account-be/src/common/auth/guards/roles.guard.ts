import { ROLES_KEY } from '@/common/decorators/roles.decorator';
import { RoleEnum } from '@/common/enum/role.enum';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleEnum[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredRoles) return true;
    const user = context.switchToHttp().getRequest().user;
    // console.log({ user });
    const hasRequiredRole = requiredRoles.some((role) => {
      return (
        user.roleName === RoleEnum[role.toUpperCase() as keyof typeof RoleEnum]
      );
    });
    return hasRequiredRole;
  }
}
