import { Injectable } from '@nestjs/common';
import { DomainTypeEnum } from '@/common/enum/crud.enum';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { ProjectCRUDFacade } from './project.crud.facade';

@Injectable()
export class CRUDFacadeFactory {
  constructor(private readonly projectCRUDFacade: ProjectCRUDFacade) {}

  getCRUDFacade(type: string) {
    if (type === DomainTypeEnum.PROJECT) return this.projectCRUDFacade;
    // else if (type === DomainType.USER) return this.userCRUDFacade;
    else throw new CustomException(ErrorEnum.BAD_REQUEST);
  }
}
