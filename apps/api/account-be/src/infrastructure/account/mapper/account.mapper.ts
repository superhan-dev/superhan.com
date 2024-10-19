import { Account } from '@/domain/account/model/account';
import { AccountEntity } from '../entity/account.entity';

export class AccountMapper {
  static toDomain(entity: AccountEntity) {
    return new Account({
      accountId: entity.id,
      username: entity.username,
    });
  }
}
