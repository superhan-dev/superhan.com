import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AccountApplicationService } from 'src/application/account/account.application.service';
import { Account } from 'src/domain/account/model/account';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AccountApplicationService) {
    super({
      usernameField: 'username', // 기본 필드 이름
      passwordField: 'password', // 기본 필드 이름
      passReqToCallback: true, // req 객체를 콜백 함수에 전달
    });
  }

  async validate(req: any, username: string, password: string): Promise<any> {
    const projectName: string = req.body.projectName;
    const roleName: string = req.body.roleName;

    const account: Account = await this.authService.validateAccount({
      username,
      password,
      projectName,
      roleName,
    });
    if (!account) {
      throw new UnauthorizedException();
    }
    return account;
  }
}
