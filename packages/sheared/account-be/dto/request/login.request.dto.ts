import { TokenDto } from '../token.dto';

export class LoginRequestDto extends TokenDto {
  username: string;
  password: string;
  projectName: string;
  roleName: string;
}
