import { LoginResponseDto } from '../dto/account/response/login.response.dto';

export class AccountSwaggerData {
  static loginResponse: LoginResponseDto = {
    accessToken: 'access-token',
    refreshToken: 'refresh-token',
  };
}
