import { PartialType } from '@nestjs/mapped-types';
import { CreateCustomerAuthDto } from './create-customer-auth.dto';

export class UpdateCustomerAuthDto extends PartialType(CreateCustomerAuthDto) {}
