import { Module } from '@nestjs/common';
import { AuthFacadeFactory } from 'src/application/auth/auth.facade.factory';

@Module({
  providers: [AuthFacadeFactory],
  exports: [AuthFacadeFactory],
})
export class AuthFacadeModule {}
