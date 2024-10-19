import { PartialType } from '@nestjs/swagger';
import { CreateAuthDto } from './create-auth.request.dto';

export class UpdateAuthDto extends PartialType(CreateAuthDto) {}
