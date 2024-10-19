import { AccountApplicationService } from '@/application/account/account.application.service';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterAccountRequestDto } from '../dto/account/request/register-account.request.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('계정 등록')
@Controller('/api/account')
export class AccountController {
  constructor(private readonly accountService: AccountApplicationService) {}

  @Post('/register')
  @ApiOperation({ summary: '계정 등록' })
  @ApiResponse({
    status: 200,
    description: 'OK',
  })
  async registerAccount(
    @Body() dto: RegisterAccountRequestDto
  ): Promise<boolean> {
    return await this.accountService.registerAccount(dto);
  }
}
