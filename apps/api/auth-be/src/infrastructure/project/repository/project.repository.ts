import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ErrorCode } from 'src/common/constants/error.constant';
import { CustomException } from 'src/common/exception/custom.exception';
import { Project } from 'src/domain/project/model/Project';
import { CreateProjectRequestDto } from 'src/presentation/dto/project/request/create-project.request.dto';
import { Repository } from 'typeorm';
import { ProjectEntity } from '../entity/project.entity';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectRepository(ProjectEntity)
    private readonly repository: Repository<ProjectEntity>
  ) {}

  async create(dto: CreateProjectRequestDto): Promise<Project> {
    const entity: ProjectEntity = this.repository.create({ name: dto.name });
    const result = await this.repository.save(entity);

    if (!result) throw new CustomException(ErrorCode.CREATE_PROJECT_FAILED);

    return result;
  }
}
