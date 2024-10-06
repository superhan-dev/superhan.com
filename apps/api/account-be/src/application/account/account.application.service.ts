import { Injectable } from '@nestjs/common';
import { CustomException } from 'src/common/exception/custom.exception';
import { ErrorEnum } from 'src/common/exception/data/error.enum';
import { AccountDomainService } from 'src/domain/account/ account.domain.service';
import { Account } from 'src/domain/account/model/account';
import { AccountDto } from '../dto/account.dto';
import { AccountInterface } from './account.interface';

@Injectable()
export class AccountApplicationService implements AccountInterface {
  constructor(private readonly accountDomainService: AccountDomainService) {}

  async registerAccount(dto: AccountDto): Promise<boolean> {
    const user = await this.accountDomainService.findOneByUsername(
      dto.username
    );
    if (user) {
      throw new CustomException(ErrorEnum.USER_ALREADY_EXIST);
    }

    const result = await this.accountDomainService.create(dto);
    if (typeof result !== 'boolean') {
      throw result;
    }

    return result;
  }

  async validateAccount(dto: AccountDto): Promise<Account> {
    // password encrypt되어있는 것을 비교하는 로직
    const user = await this.accountDomainService.findOneByUsername(
      dto.username
    );
    if (!user) {
      throw new CustomException(ErrorEnum.USER_NOT_FOUND);
    }

    return await this.accountDomainService.validateAccount(dto);
  }
}
