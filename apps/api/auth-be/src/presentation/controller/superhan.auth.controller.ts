import { Controller, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class SuperhanAuthController {
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    // Guard에서 찾아진 req를 가지고 user가 존재하는지 이미 확인한다.
    return req.user;
  }

  @Post('')
  async register() {}
}
