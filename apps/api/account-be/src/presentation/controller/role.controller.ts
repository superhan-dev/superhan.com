import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CrudFacadeFactory } from '@/application/crud/crud.facade.factory';
import { DomainTypeEnum } from '@/common/enum/crud.enum';
import { CreateRoleRequestDto } from '../dto/role/request/create-role.request.dto';
import { Role } from '@/domain/role/model/role';
import { UpdateRoleRequestDto } from '../dto/role/request/update-role.request.dto';

@Controller('/api/role')
export class RoleController {
  constructor(private readonly crudFacadeFactory: CrudFacadeFactory) {}

  @Post('/register')
  async register(@Body() dto: CreateRoleRequestDto): Promise<Role> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.ROLE)
      .create(dto);
  }

  @Get('/list')
  async getList(): Promise<Role[]> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.ROLE)
      .read();
  }

  @Put('/update')
  async update(@Body() dto: UpdateRoleRequestDto): Promise<boolean> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.ROLE)
      .update(dto);
  }

  @Delete('/delete/:id')
  async delete(@Param('id') id: number): Promise<Role> {
    return await this.crudFacadeFactory
      .getCrudFacade(DomainTypeEnum.ROLE)
      .delete(id);
  }
}
