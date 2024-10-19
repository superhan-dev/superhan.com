import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { AccountEntity } from '../entity/account.entity';
import { AccountMapper } from '../mapper/account.mapper';
import { Account } from '@/domain/account/model/account';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(AccountEntity)
    private readonly repository: Repository<AccountEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create(username: string): Promise<Account | undefined> {
    const user = this.repository.create({ username: username });
    const result = await this.repository.save(user);

    return result ? AccountMapper.toDomain(result) : undefined;
  }

  async findOneByUsername(username: string): Promise<Account | undefined> {
    const result = await this.dataSource
      .createQueryBuilder()
      .select('u')
      .from(AccountEntity, 'u')
      .where('u.username = :username', { username })
      .getOne();

    return result ? AccountMapper.toDomain(result) : undefined;
  }
}
