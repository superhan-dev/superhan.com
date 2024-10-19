import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { UserRole } from '@/domain/account/model/user-project-role';
import { Repository } from 'typeorm';
import { AccountRoleEntity } from '../entity/account-role.entity';

@Injectable()
export class UserRoleRepository {
  constructor(
    @InjectRepository(AccountRoleEntity)
    private readonly repository: Repository<AccountRoleEntity>
  ) {}

  async create(userRole: UserRole): Promise<any> {
    const result = await this.repository.save(userRole);

    if (!result) {
      throw new CustomException(ErrorEnum.PROJECT_CREATE_FAILED);
    }
  }
}
