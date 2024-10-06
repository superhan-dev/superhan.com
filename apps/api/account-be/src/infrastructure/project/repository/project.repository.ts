import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from 'src/common/exception/custom.exception';
import { ErrorEnum } from 'src/common/exception/data/error.enum';
import { Project } from 'src/domain/project/model/project';
import { CreateProjectRequestDto } from 'src/presentation/dto/project/request/create-project.request.dto';
import { DataSource, Repository } from 'typeorm';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectMapper } from '../mapper/project.mapper';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create(dto: CreateProjectRequestDto): Promise<Project> {
    const entity: ProjectEntity = this.repository.create({ name: dto.name });
    const result = await this.repository.save(entity);

    if (!result) throw new CustomException(ErrorEnum.PROJECT_CREATE_FAILED);

    return result;
  }

  async findOneByProjectName(projectName: string) {
    const result = await this.dataSource
      .createQueryBuilder()
      .select('p')
      .from(ProjectEntity, 'p')
      .where('p.name = :projectName', { projectName })
      .getOne();

    return result ? ProjectMapper.toDomain(result) : undefined;
  }
}
