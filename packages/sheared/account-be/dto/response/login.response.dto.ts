import { TokenDto } from '../token.dto';

export class LoginResponseDto extends TokenDto {
  accountId: number;
}
