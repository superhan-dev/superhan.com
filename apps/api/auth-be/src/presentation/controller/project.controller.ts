import { Body, Controller, Post } from '@nestjs/common';
import { CRUDFacadeFactory } from 'src/application/crud/crud.facade.factory';
import { DomainType } from 'src/common/constants/crud.constant';
import { Project } from 'src/domain/project/model/Project';
import { CreateProjectRequestDto } from '../dto/project/request/create-project.request.dto';

@Controller('api/project')
export class ProjectController {
  constructor(private readonly crudFacadeFactory: CRUDFacadeFactory) {}

  @Post('/register')
  async register(@Body() body: CreateProjectRequestDto): Promise<Project> {
    const dto: CreateProjectRequestDto = {
      name: body.name,
    };
    return await this.crudFacadeFactory
      .getCRUDFacade(DomainType.PROJECT)
      .create(dto);
  }
}
