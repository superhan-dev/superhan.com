import { CrudFacadeFactory } from '@/application/crud/crud.facade.factory';
import { DomainTypeEnum } from '@/common/enum/crud.enum';
import { Project } from '@/domain/project/model/project';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateProjectRequestDto } from '../dto/project/request/create-project.request.dto';
import { UpdateProjectRequestDto } from '../dto/project/request/update-project.request.dto';

@Controller('/api/project')
export class ProjectController {
  constructor(private readonly crudFacadeFactory: CrudFacadeFactory) {}

  @Post('/register')
  async register(@Body() dto: CreateProjectRequestDto): Promise<Project> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.PROJECT)
      .create(dto);
  }

  @Get('/list')
  async getList(): Promise<Project[]> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.PROJECT)
      .read();
  }

  @Put('/update')
  async update(@Body() dto: UpdateProjectRequestDto): Promise<boolean> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.PROJECT)
      .update(dto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<boolean> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.PROJECT)
      .delete(id);
  }
}
