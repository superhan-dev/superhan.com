import { User } from '@/domain/account/model/user';
import { UserEntity } from '../entity/user.entity';

export class UserMapper {
  static toDomain(entity: UserEntity) {
    return new User({
      userId: entity.id,
      username: entity.username,
    });
  }
}
