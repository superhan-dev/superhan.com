import { Injectable } from '@nestjs/common';
import { ProjectService } from 'src/domain/project/project.service';
import { CreateProjectRequestDto } from 'src/presentation/dto/project/request/create-project.request.dto';
import { CRUDInterface } from './crud.interface';

@Injectable()
export class ProjectCRUDFacade implements CRUDInterface {
  constructor(private readonly projectService: ProjectService) {}

  async create(dto: CreateProjectRequestDto): Promise<any> {
    return await this.projectService.create(dto);
  }
}
