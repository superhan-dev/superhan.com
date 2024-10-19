import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashPassword } from '@/domain/account/model/hash-password';
import { DataSource, Repository } from 'typeorm';
import { HashPasswordEntity } from '../entity/hash-password.entity';
import { HashPasswordMapper } from '../mapper/hash-password.mapper';
import { CustomException } from '@/common/exception/custom.exception';
import { ErrorEnum } from '@/common/exception/data/error.enum';

@Injectable()
export class HashPasswordRepository {
  constructor(
    @InjectRepository(HashPasswordEntity)
    private readonly repository: Repository<HashPasswordEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create(password: string, salt: string): Promise<boolean> {
    const hashPassword = this.repository.create({ password, salt });
    const result = await this.repository.save(hashPassword);

    return !!result;
  }

  async findOneByAccountId(accountId: number): Promise<HashPassword> {
    const entity: HashPasswordEntity | null = await this.dataSource
      .createQueryBuilder()
      .select('hp')
      .from(HashPasswordEntity, 'hp')
      .where('hp.account_id = :accountId', { accountId })
      .getOne();

    if (!entity) {
      throw new CustomException(ErrorEnum.HASH_PASSWORD_NOT_FOUND);
    }

    return HashPasswordMapper.toDomain(entity);
  }
}
