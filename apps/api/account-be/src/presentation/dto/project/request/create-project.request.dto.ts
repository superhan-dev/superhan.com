import { IsString } from 'class-validator';

export class CreateProjectRequestDto {
  @IsString()
  name: string;
}
