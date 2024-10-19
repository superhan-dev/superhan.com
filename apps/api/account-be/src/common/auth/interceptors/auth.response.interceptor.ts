import { calculateMaxAge } from '@/common/helpers/jwt.helper';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map, Observable } from 'rxjs';

@Injectable()
export class AuthResponseInterCeptor implements NestInterceptor {
  constructor(private readonly configService: ConfigService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        // Express response 객체 가져오기
        const response = context.switchToHttp().getResponse();

        const refreshJwtExpireIn = this.configService.get<string>(
          'REFRESH_JWT_EXPIRE_IN'
        );

        // 쿠키 설정
        response.cookie('refresh_token', data.refreshToken, {
          httpOnly: true, // 클라이언트에서 자바스크립트로 접근 불가
          secure: true, // HTTPS에서만 전송 (HTTPS 사용 시)
          maxAge: calculateMaxAge(
            refreshJwtExpireIn ? refreshJwtExpireIn : 360000
          ), // 쿠키 만료시간
          sameSite: 'strict', // CSRF 보호 설정
        });
        return {
          statusCode: response.statusCode,
          message: 'a token set successfully issued!',
          data: { accessToken: data.accessToken },
        };
      })
    );
  }
}
