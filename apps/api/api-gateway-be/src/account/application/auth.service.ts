import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CurrentUserType,
  LoginRequestDto,
  LoginResponseDto,
} from '@packages/sheared';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private readonly httpService: HttpService) {}

  async validateAccessToken(token: string): Promise<CurrentUserType> {
    const response: AxiosResponse<CurrentUserType> = await firstValueFrom(
      this.httpService.post(
        `${process.env.AUTH_API_URL}/api/auth/validate-token`,
        {
          token,
        }
      )
    );

    return response.data;
  }

  async login(dto: LoginRequestDto) {
    const response: AxiosResponse<LoginResponseDto> = await firstValueFrom(
      this.httpService.post(`${process.env.AUTH_API_URL}/api/auth/login`, dto)
    );
    return response.data;
  }
}
