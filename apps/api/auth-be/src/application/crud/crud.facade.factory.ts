import { Injectable } from '@nestjs/common';
import { DomainType } from 'src/common/constants/crud.constant';
import { ErrorCode } from 'src/common/constants/error.constant';
import { CustomException } from 'src/common/exception/custom.exception';
import { ProjectCRUDFacade } from './project.crud.facade';

@Injectable()
export class CRUDFacadeFactory {
  constructor(private readonly projectCRUDFacade: ProjectCRUDFacade) {}

  getCRUDFacade(type: string) {
    if (type === DomainType.PROJECT) return this.projectCRUDFacade;
    // else if (type === DomainType.USER) return this.userCRUDFacade;
    else throw new CustomException(ErrorCode.BAD_REQUEST);
  }
}
