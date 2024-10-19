import { Injectable } from '@nestjs/common';
import { AccountDomainService } from '@/domain/account/service/account.domain.service';
import { RegisterAccountRequestDto } from '@/presentation/dto/account/request/register-account.request.dto';

@Injectable()
export class AccountApplicationService {
  constructor(private readonly accountDomainService: AccountDomainService) {}

  async registerAccount(dto: RegisterAccountRequestDto): Promise<boolean> {
    const result = await this.accountDomainService.createAccount(dto);
    if (typeof result !== 'boolean') {
      throw result;
    }

    return result;
  }
}
