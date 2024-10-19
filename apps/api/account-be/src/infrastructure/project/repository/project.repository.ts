import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { Project } from '@/domain/project/model/project';
import { CreateProjectRequestDto } from '@/presentation/dto/project/request/create-project.request.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, UpdateResult } from 'typeorm';
import { ProjectEntity } from '../entity/project.entity';
import { ProjectMapper } from '../mapper/project.mapper';
import { UpdateProjectRequestDto } from '@/presentation/dto/project/request/update-project.request.dto';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create(dto: CreateProjectRequestDto): Promise<Project | undefined> {
    const result: ProjectEntity = await this.repository.save({
      projectName: dto.projectName,
      isDeleted: dto.isDeleted,
    });

    return result ? ProjectMapper.toDomain(result) : undefined;
  }

  async update(dto: UpdateProjectRequestDto): Promise<boolean> {
    const result = await this.dataSource
      .createQueryBuilder()
      .update(ProjectEntity)
      .set({ projectName: dto.projectName })
      .where('id = :id', { id: dto.id })
      .andWhere('is_deleted = :isDeleted', { isDeleted: false })
      .execute();

    if (!result.affected || result.affected <= 0) {
      throw new CustomException(ErrorEnum.PROJECT_UPDATE_FAILED);
    }

    return result.affected > 0;
  }

  async logicalDelete(id: number): Promise<boolean> {
    const result: UpdateResult = await this.repository.update(id, {
      isDeleted: true,
    });

    if (!result.affected || result.affected <= 0) {
      throw new CustomException(ErrorEnum.PROJECT_DELETE_FAILED);
    }
    return result.affected > 0;
  }

  async findOneByProjectName(projectName: string) {
    const result = await this.dataSource
      .createQueryBuilder()
      .select('p')
      .from(ProjectEntity, 'p')
      .where('p.project_name = :projectName', { projectName })
      .getOne();

    return result ? ProjectMapper.toDomain(result) : undefined;
  }
}
