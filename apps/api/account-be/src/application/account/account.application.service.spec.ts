import { Test, TestingModule } from '@nestjs/testing';
import { AccountApplicationService } from './account.application.service';
import { AccountModule } from '@/module/account.module';

describe('Account Service Test', () => {
  let accountApplicationService: AccountApplicationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AccountModule],
      providers: [AccountApplicationService],
    }).compile();
    accountApplicationService = module.get<AccountApplicationService>(
      AccountApplicationService
    );
  });

  it('should be defined', () => {
    expect(accountApplicationService).toBeDefined();
  });
});
