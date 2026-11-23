import { PartialType } from '@nestjs/mapped-types';
import { CreateAuthtDto } from './create-auth.dto';

export class UpdateAuthDto extends PartialType(CreateAuthtDto) {}
