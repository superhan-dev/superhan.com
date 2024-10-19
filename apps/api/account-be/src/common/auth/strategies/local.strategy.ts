import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginResponseDto } from '@/presentation/dto/account/response/login.response.dto';
import { RoleEnum } from '@/common/enum/role.enum';
import { AuthApplicationService } from '@/application/auth/auth.application.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthApplicationService) {
    super({
      usernameField: 'username', // 기본 필드 이름
      passwordField: 'password', // 기본 필드 이름
      passReqToCallback: true, // req 객체를 콜백 함수에 전달
    });
  }

  async validate(
    req: any,
    username: string,
    password: string
  ): Promise<LoginResponseDto> {
    const projectName: string = req.body.projectName;
    const roleName: RoleEnum = req.body.roleName;

    const tokens: LoginResponseDto = await this.authService.validateAccount({
      username,
      password,
      projectName,
      roleName,
    });
    if (!tokens) {
      throw new UnauthorizedException();
    }

    return tokens;
  }
}
