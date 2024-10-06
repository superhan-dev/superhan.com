import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class Project {
  @IsNotEmpty({ message: 'project id는 필수값 입니다.' })
  @IsNumber()
  id: number;

  @IsNotEmpty({ message: 'project name은 필수값 입니다.' })
  @IsString()
  name: string;

  constructor({ id, name }: Project) {
    this.id = id;
    this.name = name;
  }
}
