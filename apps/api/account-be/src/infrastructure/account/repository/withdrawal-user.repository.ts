import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawalUserEntity } from '../entity/withdrawal-user.entity';

@Injectable()
export class WithdrawalUserRepository {
  constructor(
    @InjectRepository(WithdrawalUserEntity)
    private readonly WithdrawalUserRepository: Repository<WithdrawalUserEntity>
  ) {}
}
