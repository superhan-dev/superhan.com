import { SetMetadata } from '@nestjs/common';
import { ProjectEnum } from '@packages/sheared';

export const PROJECTS_KEY = 'projects';
export const RequireProjects = (...projects: [ProjectEnum, ...ProjectEnum[]]) =>
  SetMetadata(PROJECTS_KEY, projects);
