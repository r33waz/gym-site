import { PartialType } from '@nestjs/mapped-types';
import { CreateUserMemberShipDto } from './create-user-member-ship.dto';

export class UpdateUserMemberShipDto extends PartialType(CreateUserMemberShipDto) {}
