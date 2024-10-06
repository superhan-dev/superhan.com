import { AccountDto } from '../dto/account.dto';

export interface AccountInterface {
  validateAccount(dto: AccountDto): Promise<any>;
  registerAccount(dto: AccountDto): Promise<any>;
}
