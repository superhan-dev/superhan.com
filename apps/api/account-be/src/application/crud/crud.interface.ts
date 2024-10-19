import { CreateProjectRequestDto } from '@/presentation/dto/project/request/create-project.request.dto';
import { UpdateProjectRequestDto } from '@/presentation/dto/project/request/update-project.request.dto';
import { CreateRoleRequestDto } from '@/presentation/dto/role/request/create-role.request.dto';
import { UpdateRoleRequestDto } from '@/presentation/dto/role/request/update-role.request.dto';

export interface CrudInterface {
  create?(dto: any): Promise<any>;
  read?(params: any): Promise<any>;
  update?(id: any, dto: any): Promise<any>;
  delete?(id: any): Promise<any>;
}

export type CrudCreateDto = CreateProjectRequestDto & CreateRoleRequestDto;
export type CrudUpdateDto = UpdateProjectRequestDto & UpdateRoleRequestDto;
