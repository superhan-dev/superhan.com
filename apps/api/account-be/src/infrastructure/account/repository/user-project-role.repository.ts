import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';
import { UserProjectRole } from '@/domain/account/model/user-project-role';
import { Repository } from 'typeorm';
import { UserProjectRoleEntity } from '../entity/user-project-role.entity';

@Injectable()
export class UserProjectRoleRepository {
  constructor(
    @InjectRepository(UserProjectRoleEntity)
    private readonly repository: Repository<UserProjectRoleEntity>
  ) {}

  async create(userProjectRole: UserProjectRole): Promise<any> {
    const result = await this.repository.save(userProjectRole);

    if (!result) {
      throw new CustomException(ErrorEnum.PROJECT_CREATE_FAILED);
    }
  }
}
