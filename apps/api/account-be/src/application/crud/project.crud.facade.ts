import { Injectable } from '@nestjs/common';
import { ProjectDomainService } from '@/domain/project/service/project.domain.service';
import { CreateProjectRequestDto } from '@/presentation/dto/project/request/create-project.request.dto';
import {
  CrudCreateDto,
  CrudInterface as CrudInterface,
  CrudUpdateDto,
} from './crud.interface';
import { Project } from '@/domain/project/model/project';

@Injectable()
export class ProjectCrudFacade implements CrudInterface {
  constructor(private readonly projectService: ProjectDomainService) {}

  async create(dto: CrudCreateDto): Promise<Project> {
    return await this.projectService.create(dto);
  }

  async update(dto: CrudUpdateDto): Promise<boolean> {
    return await this.projectService.update(dto);
  }

  async delete(id: number): Promise<boolean> {
    return await this.projectService.delete(id);
  }
}
