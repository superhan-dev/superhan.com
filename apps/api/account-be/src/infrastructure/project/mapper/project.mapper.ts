import { Project } from '@/domain/project/model/project';
import { ProjectEntity } from '../entity/project.entity';

export class ProjectMapper {
  static toDomain(entity: ProjectEntity): Project {
    return new Project({
      id: entity.id,
      projectName: entity.projectName,
    });
  }
}
