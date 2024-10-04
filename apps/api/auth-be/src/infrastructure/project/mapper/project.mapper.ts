import { Project } from 'src/domain/project/model/Project';
import { ProjectEntity } from '../entity/project.entity';

export class ProjectMapper {
  static toDomain(entity: ProjectEntity): Project {
    return new Project({
      id: entity.id,
      name: entity.name,
    });
  }
}
