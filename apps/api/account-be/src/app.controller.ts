import { Controller, Get, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './common/auth/guards/jwt-auth.guard';
import { RolesGuard } from './common/auth/guards/roles.guard';
import { Roles } from './common/decorators/roles.decorator';
import { RoleEnum } from './common/enum/role.enum';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Roles(RoleEnum.ADMIN)
  @UseGuards(RolesGuard)
  @UseGuards(JwtAuthGuard)
  // @ApiBearerAuth('accessToken')
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // @Roles(RoleEnum.USER)
  // @UseGuards(RolesGuard)
  // @Get('test')
  // getTest(): string {
  //   return this.appService.getHello();
  // }
}
