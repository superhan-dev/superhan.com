import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashPassword } from 'src/domain/account/model/hash-password';
import { DataSource, Repository } from 'typeorm';
import { HashPasswordEntity } from '../entity/hash-password.entity';
import { HashPasswordMapper } from '../mapper/hash-password.mapper';

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

  async findOneByUserId(userId: number): Promise<HashPassword> {
    const entity: HashPasswordEntity = await this.dataSource
      .createQueryBuilder()
      .select('hp')
      .from(HashPasswordEntity, 'hp')
      .where('hp.user_id = :userId', { userId })
      .getOne();

    return HashPasswordMapper.toDomain(entity);
  }
}
