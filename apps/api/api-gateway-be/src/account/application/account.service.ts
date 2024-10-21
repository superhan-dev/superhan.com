import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { RegisterAccountRequestDto } from '@packages/sheared';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AccountService {
  constructor(private readonly httpService: HttpService) {}

  async register(dto: RegisterAccountRequestDto): Promise<boolean> {
    const response: AxiosResponse<boolean> = await firstValueFrom(
      this.httpService.post(
        `${process.env.AUTH_API_URL}/api/account/register`,
        dto
      )
    );

    return response.data;
  }
}
