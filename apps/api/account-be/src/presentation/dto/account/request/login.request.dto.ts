import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { AccountDto } from '@/application/dto/account.dto';

export class LoginRequestDto extends AccountDto {
  @ApiProperty({ name: '사용자 ID' })
  username: string;

  @ApiProperty({ name: '사용자 비밀번호' })
  password: string;

  @ApiProperty({ name: '서비스 이름' })
  projectName: string;
}
