import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { ProjectRepository } from '@/infrastructure/project/repository/project.repository';
import { CreateProjectRequestDto } from '@/presentation/dto/project/request/create-project.request.dto';
import { UpdateProjectRequestDto } from '@/presentation/dto/project/request/update-project.request.dto';
import { Injectable } from '@nestjs/common';
import { Project } from '../model/project';

@Injectable()
export class ProjectDomainService {
  constructor(private readonly projectRepository: ProjectRepository) {}
  async create(dto: CreateProjectRequestDto): Promise<Project> {
    const result: Project | undefined =
      await this.projectRepository.create(dto);
    if (!result) throw new CustomException(ErrorEnum.PROJECT_CREATE_FAILED);

    return result;
  }

  async getList(): Promise<Project[]> {
    const result: Project[] | undefined =
      await this.projectRepository.findAll();
    if (!result) throw new CustomException(ErrorEnum.PROJECT_NOT_FOUND);

    return result;
  }

  async update(dto: UpdateProjectRequestDto): Promise<boolean> {
    const result = await this.projectRepository.update(dto);
    if (!result) throw new CustomException(ErrorEnum.PROJECT_UPDATE_FAILED);
    return result;
  }

  async delete(id: number): Promise<boolean> {
    const result: boolean = await this.projectRepository.logicalDelete(id);
    if (!result) throw new CustomException(ErrorEnum.PROJECT_DELETE_FAILED);
    return result;
  }

  async findOneByProjectName(projectName: string) {
    return await this.projectRepository.findOneByProjectName(projectName);
  }
}
