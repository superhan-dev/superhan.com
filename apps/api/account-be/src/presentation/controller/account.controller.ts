import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AccountApplicationService } from 'src/application/account/account.application.service';
import { RegisterAccountRequestDto } from '../dto/account/request/register-account.request.dto';

@Controller('/api/account')
export class AccountController {
  constructor(private readonly accountService: AccountApplicationService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // Guard에서 찾아진 req를 가지고 user가 존재하는지 이미 확인한다.
    return req.user;
  }

  @Post('/register')
  async registerAccount(
    @Body() dto: RegisterAccountRequestDto
  ): Promise<boolean> {
    return await this.accountService.registerAccount(dto);
  }
}
