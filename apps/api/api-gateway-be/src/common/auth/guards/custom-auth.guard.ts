import { AuthService } from '@/account/application/auth.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class CustomAuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService // AuthService 주입
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    // 1. Authorization 헤더에서 Bearer 토큰 가져오기
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Authorization 헤더가 없거나 Bearer로 시작하지 않으면 false 반환
      return false;
    }

    // 2. 'Bearer ' 접두사 제거하고 토큰 값만 추출
    const token = authHeader.split(' ')[1];

    try {
      // 2. AuthService를 사용하여 토큰 유효성 검증 (account 서버와 통신)
      // token은 secret과 함께 validated 되어서 반환된다.
      const user = await this.authService.validateAccessToken(token);

      // 3. 유효하면 user와 projectType을 request에 추가
      request.user = user;

      return true; // 유효한 경우 가드 통과
    } catch (error) {
      // 4. 유효하지 않은 토큰인 경우 false 반환
      return false;
    }
  }
}
