import { ApiProperty } from '@nestjs/swagger';
import { TokenDto } from '@/application/dto/token.dto';
import { PartialType } from '@nestjs/mapped-types';

export class LoginRequestDto extends PartialType(TokenDto) {
  @ApiProperty({ name: 'username' })
  username: string;

  @ApiProperty({ name: 'password' })
  password: string;

  @ApiProperty({ name: 'projectName' })
  projectName: string;

  @ApiProperty({ name: 'roleName' })
  roleName: string;
}
