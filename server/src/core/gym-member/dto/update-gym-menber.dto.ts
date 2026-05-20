import { PartialType } from '@nestjs/mapped-types';
import { CreateGymMenberDto } from './create-gym-menber.dto';

export class UpdateGymMenberDto extends PartialType(CreateGymMenberDto) {}
