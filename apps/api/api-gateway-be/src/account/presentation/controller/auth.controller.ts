import { AuthService } from '@/account/application/auth.service';
import { Body, Controller, Logger, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import {
  AccountSwaggerData,
  LoginRequestDto,
  LoginResponseDto,
} from '@packages/sheared';

@ApiTags('계정 인증')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly logger: Logger,
    private readonly authService: AuthService
  ) {}
  @Post('/login')
  @ApiOperation({ summary: '계정 로그인' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: LoginResponseDto,
    example: AccountSwaggerData.loginResponse,
  })
  async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
    return await this.authService.login(dto);
  }
}
