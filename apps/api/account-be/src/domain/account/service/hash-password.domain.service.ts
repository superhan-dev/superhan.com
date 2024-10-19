import { Injectable } from '@nestjs/common';
import { HashPasswordRepository } from '@/infrastructure/account/repository/hash-password.repository';

@Injectable()
export class HashPasswordDomainService {
  constructor(
    private readonly hashPasswordRepository: HashPasswordRepository
  ) {}

  async findOneHashPasswordByAccountId(accountId: number) {
    return await this.hashPasswordRepository.findOneByAccountId(accountId);
  }
}
