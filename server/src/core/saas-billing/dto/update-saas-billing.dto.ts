import { PartialType } from '@nestjs/mapped-types';
import { CreateSaasBillingDto } from './create-saas-billing.dto';

export class UpdateSaasBillingDto extends PartialType(CreateSaasBillingDto) {}
