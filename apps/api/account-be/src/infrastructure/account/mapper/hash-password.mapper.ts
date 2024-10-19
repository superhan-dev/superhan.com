import { HashPassword } from '@/domain/account/model/hash-password';
import { HashPasswordEntity } from '../entity/hash-password.entity';

export class HashPasswordMapper {
  static toDomain(entity: HashPasswordEntity) {
    return new HashPassword({
      accountId: entity.accountId,
      password: entity.password,
      salt: entity.salt,
    });
  }
}
