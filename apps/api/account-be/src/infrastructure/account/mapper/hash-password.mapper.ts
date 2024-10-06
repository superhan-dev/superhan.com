import { HashPassword } from 'src/domain/account/model/hash-password';
import { HashPasswordEntity } from '../entity/hash-password.entity';

export class HashPasswordMapper {
  static toDomain(entity: HashPasswordEntity) {
    return new HashPassword({
      userId: entity.userId,
      password: entity.password,
      salt: entity.salt,
    });
  }
}
