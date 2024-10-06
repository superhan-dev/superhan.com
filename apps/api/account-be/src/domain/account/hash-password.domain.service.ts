import { Injectable } from '@nestjs/common';
import { HashPasswordRepository } from 'src/infrastructure/account/repository/hash-password.repository';

@Injectable()
export class HashPasswordDomainService {
  constructor(
    private readonly hashPasswordRepository: HashPasswordRepository
  ) {}

  async findOneHashPasswordByUserId(userId: number) {
    return await this.hashPasswordRepository.findOneByUserId(userId);
  }
}
