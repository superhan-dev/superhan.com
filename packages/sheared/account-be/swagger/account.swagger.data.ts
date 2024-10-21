import { LoginResponseDto } from 'account-be/dto';

export class AccountSwaggerData {
  static loginResponse: LoginResponseDto = {
    accountId: 1,
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  };
}
