import { PartialType } from '@nestjs/mapped-types';
import { CreatePayRollDto } from './create-pay_roll.dto';

export class UpdatePayRollDto extends PartialType(CreatePayRollDto) {}
