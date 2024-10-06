import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/domain/account/model/user';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import { UserMapper } from '../mapper/user.mapper';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>,
    private readonly dataSource: DataSource
  ) {}

  async create(username: string): Promise<User> {
    const user = this.repository.create({ username: username });
    const result = await this.repository.save(user);

    return result ? UserMapper.toDomain(result) : undefined;
  }

  async findOneByUsername(username: string): Promise<User> {
    const result = await this.dataSource
      .createQueryBuilder()
      .select('u')
      .from(UserEntity, 'u')
      .where('u.username = :username', { username })
      .getOne();

    return result ? UserMapper.toDomain(result) : undefined;
  }
}
