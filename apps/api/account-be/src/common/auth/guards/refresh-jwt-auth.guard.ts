import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('refresh-jwt') {
  /**
   * refresh token이 일치하면 사용자 정보는 반환한다.
   */
}
