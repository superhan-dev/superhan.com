import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthInterface } from 'src/application/auth/auth.interface';

@Injectable()
export class LocalStrategy<T extends AuthInterface> extends PassportStrategy(
  Strategy
) {
  constructor(private authService: T) {
    super({
      usernameField: 'username', // 기본 필드 이름
      passwordField: 'password', // 기본 필드 이름
      passReqToCallback: true, // req 객체를 콜백 함수에 전달
    });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    const projectName: string = req.body.projectName;

    const user = await this.authService.validateUser(
      username,
      password,
      projectName
    );
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
