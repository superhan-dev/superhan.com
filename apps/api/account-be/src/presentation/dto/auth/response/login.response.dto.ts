import { TokenDto } from '@/application/dto/token.dto';
import { PartialType } from '@nestjs/mapped-types';

export class LoginResponseDto extends PartialType(TokenDto) {
  accountId: number;
}
