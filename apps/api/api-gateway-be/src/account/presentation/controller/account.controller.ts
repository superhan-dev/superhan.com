import { AccountService } from '@/account/application/account.service';
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RegisterAccountRequestDto } from '@packages/sheared';

@ApiTags('계정 관리')
@Controller('/api/account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Post('/register')
  @ApiOperation({ summary: '계정 등록' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async register(
    @Body() dto: RegisterAccountRequestDto
  ): Promise<boolean> {
    return await this.accountService.register(dto);
  }
}
