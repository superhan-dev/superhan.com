import { Body, Controller, Post } from '@nestjs/common';
import { CRUDFacadeFactory } from '@/application/crud/crud.facade.factory';
import { DomainTypeEnum } from '@/common/enum/crud.enum';
import { Project } from '@/domain/project/model/project';
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
      .getCRUDFacade(DomainTypeEnum.PROJECT)
      .create(dto);
  }
}
