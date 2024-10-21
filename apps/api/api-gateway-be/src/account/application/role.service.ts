import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import {
  CreateRoleRequestDto,
  RoleModel,
  UpdateRoleRequestDto,
} from '@packages/sheared';
import { AxiosResponse } from 'axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class RoleService {
  constructor(private readonly httpService: HttpService) {}

  async register(dto: CreateRoleRequestDto): Promise<RoleModel> {
    const response: AxiosResponse<RoleModel> = await firstValueFrom(
      this.httpService.post(
        `${process.env.AUTH_API_URL}/api/project/register`,
        dto
      )
    );
    return response.data;
  }

  async getList(): Promise<RoleModel[]> {
    console.log(process.env.AUTH_API_URL);
    const response: AxiosResponse<RoleModel[]> = await firstValueFrom(
      this.httpService.get(`${process.env.AUTH_API_URL}/api/role/list`)
    );
    return response.data;
  }

  async update(dto: UpdateRoleRequestDto): Promise<boolean> {
    const response: AxiosResponse<boolean> = await firstValueFrom(
      this.httpService.put(
        `${process.env.AUTH_API_URL}/api/project/update`,
        dto
      )
    );
    return response.data;
  }

  async delete(id: number): Promise<boolean> {
    const response: AxiosResponse<boolean> = await firstValueFrom(
      this.httpService.delete(
        `${process.env.AUTH_API_URL}/api/project/delete/${id}`
      )
    );
    return response.data;
  }
}
