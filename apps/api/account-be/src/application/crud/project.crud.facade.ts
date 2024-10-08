import { Injectable } from '@nestjs/common';
import { ProjectDomainService } from '@/domain/project/project.domain.service';
import { CreateProjectRequestDto } from '@/presentation/dto/project/request/create-project.request.dto';
import { CRUDInterface } from './crud.interface';

@Injectable()
export class ProjectCRUDFacade implements CRUDInterface {
  constructor(private readonly projectService: ProjectDomainService) {}

  async create(dto: CreateProjectRequestDto): Promise<any> {
    return await this.projectService.create(dto);
  }
}
