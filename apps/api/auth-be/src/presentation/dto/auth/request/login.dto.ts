import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ name: '사용자 ID' })
  @IsString()
  username: string;

  @ApiProperty({ name: '사용자 비밀번호' })
  @IsString()
  password: string;

  @ApiProperty({ name: '서비스 이름' })
  @IsString()
  serviceName: string;
}
