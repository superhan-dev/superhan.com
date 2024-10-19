import { RoleRepository } from '@/infrastructure/role/repository/role.repository';
import { CreateRoleRequestDto } from '@/presentation/dto/role/request/create-role.request.dto';
import { Injectable } from '@nestjs/common';
import { Role } from '../model/role';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { UpdateRoleRequestDto } from '@/presentation/dto/role/request/update-role.request.dto';

@Injectable()
export class RoleDomainService {
  constructor(private readonly roleRepository: RoleRepository) {}

  async create(dto: CreateRoleRequestDto): Promise<Role> {
    const result = await this.roleRepository.create(dto);
    if (!result) {
      throw new CustomException(ErrorEnum.ROLE_CREATE_FAILED);
    }
    return result;
  }

  async update(dto: UpdateRoleRequestDto): Promise<boolean> {
    const result: boolean = await this.roleRepository.update(dto);
    if (!result) new CustomException(ErrorEnum.ROLE_UPDATE_FAILED);

    return result;
  }

  async delete(id: number): Promise<boolean> {
    const result: boolean = await this.roleRepository.logicalDelete(id);
    if (!result) new CustomException(ErrorEnum.ROLE_DELETE_FAILED);

    return result;
  }
}
