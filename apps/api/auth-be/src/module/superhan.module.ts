import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { SuperhanAuthService } from 'src/application/auth/superhan.auth.service';
import { LocalStrategy } from 'src/common/auth/local.strategy';
import { SuperhanAuthController } from 'src/presentation/controller/superhan.auth.controller';

@Module({
  imports: [PassportModule],
  controllers: [SuperhanAuthController],
  providers: [SuperhanAuthService, LocalStrategy<SuperhanAuthService>],
})
export class AuthModule {}
