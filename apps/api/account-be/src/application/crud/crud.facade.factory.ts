import { Injectable } from '@nestjs/common';
import { DomainTypeEnum } from '@/common/enum/crud.enum';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { ProjectCrudFacade as ProjectCrudFacade } from './project.crud.facade';
import { RoleCrudFacade } from './role.crud.facade';

@Injectable()
export class CrudFacadeFactory {
  constructor(
    private readonly projectCrudFacade: ProjectCrudFacade,
    private readonly roleCrudFacade: RoleCrudFacade
  ) {}

  getCrudFacade(type: DomainTypeEnum): any {
    if (type === DomainTypeEnum.PROJECT) return this.projectCrudFacade;
    else if (type === DomainTypeEnum.ROLE) return this.roleCrudFacade;
    else throw new CustomException(ErrorEnum.BAD_REQUEST);
  }
}
