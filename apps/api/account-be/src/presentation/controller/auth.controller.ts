import { Public } from '@/common/decorators/public.decorator';
import { LocalAuthGuard } from '@/common/auth/guards/local-auth.guard';
import { RefreshJwtAuthGuard } from '@/common/auth/guards/refresh-jwt-auth.guard';
import { AuthResponseInterCeptor } from '@/common/auth/interceptors/auth.response.interceptor';
import {
  Controller,
  Post,
  Request,
  UseGuards,
  HttpCode,
  HttpStatus,
  Req,
  UseInterceptors,
  Res,
  Body,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { LoginResponseDto } from '../dto/account/response/login.response.dto';
import { AccountSwaggerData } from '../data/account.swagger.data';
import { Response } from 'express';
import { LoginRequestDto } from '../dto/auth/request/login.request.dto';

@ApiTags('계정 인증')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly logger: Logger) {}
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(AuthResponseInterCeptor)
  @Post('/login')
  @ApiOperation({ summary: '계정 로그인' })
  @ApiResponse({
    status: 200,
    description: 'OK',
    type: LoginResponseDto,
    example: AccountSwaggerData.loginResponse,
  })
  async login(@Request() req: any, @Body() dto: LoginRequestDto) {
    this.logger.log('dto:', dto, 'AuthController Login');
    return req.user;
  }

  @UseGuards(RefreshJwtAuthGuard)
  @UseInterceptors(AuthResponseInterCeptor)
  @Post('/refresh')
  async refreshToken(@Req() req: any) {
    return req.user;
  }

  @Post('/sign-out')
  signOut(@Res() response: Response): Response<any, Record<string, any>> {
    response.clearCookie('refresh_token', {
      httpOnly: true, // 클라이언트에서 자바스크립트로 접근 불가
      secure: true, // HTTPS에서만 전송 (HTTPS 사용 시)
      sameSite: 'strict', // CSRF 보호 설정
    });

    return response
      .status(HttpStatus.OK)
      .json({ message: 'Signed out successfully' });
  }
}
