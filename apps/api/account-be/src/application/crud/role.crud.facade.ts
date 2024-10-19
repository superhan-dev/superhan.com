import { CrudCreateDto, CrudInterface, CrudUpdateDto } from './crud.interface';
import { RoleDomainService } from '@/domain/role/service/role.domain.service';
import { Injectable } from '@nestjs/common';
import { Role } from '@/domain/role/model/role';

@Injectable()
export class RoleCrudFacade implements CrudInterface {
  constructor(private readonly roleDomainService: RoleDomainService) {}
  async create(dto: CrudCreateDto): Promise<Role> {
    return await this.roleDomainService.create(dto);
  }

  async update(dto: CrudUpdateDto): Promise<boolean> {
    return await this.roleDomainService.update(dto);
  }

  async delete(id: number): Promise<boolean> {
    return await this.roleDomainService.delete(id);
  }
}
