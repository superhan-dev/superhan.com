import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Inject, Injectable } from '@nestjs/common';
import { AuthApplicationService } from '@/application/auth/auth.application.service';
import jwtConfig from '../../config/auth/jwt.auth.config';
import { AuthJwtPayload } from '../types/auth-jwt-payload';
import { Request } from 'express';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    @Inject(jwtConfig.KEY)
    private jwtConfiguration: ConfigType<typeof jwtConfig>,
    private authService: AuthApplicationService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: jwtConfiguration.secret,
      ignoreExpiration: false,
      passReqToCallback: true,
    });
  }

  /**
   *
   * @param req req가 없으면 token을 식별하지 못한다.
   * @param payload
   * @returns
   */
  validate(req: Request, payload: AuthJwtPayload) {
    const account = payload.sub;
    return this.authService.validateJwtToken(account);
  }
}
