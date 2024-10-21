import { PROJECTS_KEY } from '@/common/decorators/require-projects.decorator';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProjectEnum } from '@packages/sheared';

@Injectable()
export class ProjectsGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(context: ExecutionContext): boolean {
    const requiredProjects = this.reflector.getAllAndOverride<ProjectEnum[]>(
      PROJECTS_KEY,
      [context.getHandler(), context.getClass()]
    );
    if (!requiredProjects) return true;
    const user = context.switchToHttp().getRequest().user;
    const hasRequiredProject = requiredProjects.some((project) => {
      return (
        user.projectName ===
        ProjectEnum[project.toUpperCase() as keyof typeof ProjectEnum]
      );
    });
    return hasRequiredProject;
  }
}
