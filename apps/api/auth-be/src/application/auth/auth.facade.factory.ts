import { Injectable } from '@nestjs/common';
import { ErrorCode } from 'src/common/constants/error.constant';
import { ProjectType } from 'src/common/constants/project.constant';
import { CustomException } from 'src/common/exception/custom.exception';
import { SuperhanAuthService } from './superhan.auth.service';

@Injectable()
export class AuthFacadeFactory {
  constructor(private superhanAuthService: SuperhanAuthService) {}

  getAuthFacade(type: ProjectType) {
    if (type === ProjectType.SUPERHAN) {
      return this.superhanAuthService;
    }
    // else if (type === ProjectType.OTHER) {
    //  return this.otherAuthService;
    // }
    else throw new CustomException(ErrorCode.BAD_REQUEST);
  }
}
