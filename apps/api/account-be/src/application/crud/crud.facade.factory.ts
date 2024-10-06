import { Injectable } from '@nestjs/common';
import { DomainTypeEnum } from 'src/common/enum/crud.enum';
import { CustomException } from 'src/common/exception/custom.exception';
import { ErrorEnum } from 'src/common/exception/data/error.enum';
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
