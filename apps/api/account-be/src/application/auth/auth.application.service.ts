import refreshJwtConfig from '@/common/config/auth/refresh-jwt.auth.config';
import { AuthJwtPayload } from '@/common/auth/types/auth-jwt-payload';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { AccountDomainService } from '@/domain/account/service/account.domain.service';
import { LoginRequestDto } from '@/presentation/dto/auth/request/login.request.dto';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { TokenDto } from '../dto/token.dto';
import { LoginResponseDto } from '@/presentation/dto/account/response/login.response.dto';
import { AuthDomainService } from '@/domain/auth/auth.domain.service';
import { Account } from '@/domain/account/model/account';
import { CurrentUser } from '@/common/auth/types/current-user';

@Injectable()
export class AuthApplicationService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(refreshJwtConfig.KEY)
    private refreshTokenConfig: ConfigType<typeof refreshJwtConfig>,
    private readonly accountDomainService: AccountDomainService,
    private readonly authDomainService: AuthDomainService
  ) {}

  /**
   * 사용자의 패스워드와 프로젝트 권한을 확인하여 반환한다.
   * @param dto
   * @returns
   */
  async validateAccount(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const account: Account = await this.authDomainService.validateAccount(dto);
    const { accessToken, refreshToken } = await this.generateTokens(
      account.accountId
    );

    return {
      accessToken,
      refreshToken,
    };
  }

  async generateTokens(accountId: number): Promise<TokenDto> {
    const payload: AuthJwtPayload = { sub: accountId };

    const accessToken = await this.jwtService.signAsync(payload);
    const refreshToken = await this.jwtService.signAsync(
      payload,
      this.refreshTokenConfig
    );
    return {
      accessToken,
      refreshToken,
    };
  }

  async refreshToken(accountId: number): Promise<LoginResponseDto> {
    const account: Account | undefined =
      await this.accountDomainService.findOneByAccountId(accountId);
    if (!account) {
      throw new CustomException(ErrorEnum.USER_NOT_FOUND);
    }
    const { accessToken, refreshToken } = await this.generateTokens(accountId);

    return {
      accessToken,
      refreshToken,
    };
  }

  async validateJwtToken(accountId: number): Promise<CurrentUser> {
    const account: Account | undefined =
      await this.accountDomainService.findOneByAccountId(accountId);
    if (!account) {
      throw new CustomException(ErrorEnum.USER_NOT_FOUND);
    }
    const currentUser: CurrentUser = {
      accountId: account.accountId,
      roleName: account.roleName!,
    };
    return currentUser;
  }

  // TODO: refresh token을 blacklist를 만들어 관리하면 보다 보안을 강화할 수 있다.
}
