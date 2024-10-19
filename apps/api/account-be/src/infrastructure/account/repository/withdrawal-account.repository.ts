import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { WithdrawalAccountEntity } from '../entity/withdrawal-account.entity';

@Injectable()
export class WithdrawalAccountRepository {
  constructor(
    @InjectRepository(WithdrawalAccountEntity)
    private readonly repository: Repository<WithdrawalAccountEntity>
  ) {}
}
