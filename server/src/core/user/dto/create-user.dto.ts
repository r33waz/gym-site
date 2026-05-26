import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  IsUUID,
} from 'class-validator';
import { SYSTEM_ROLE, GYM_ROLE } from '../../../constant/enum/common.enum';

export class CreateUserDto {
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must be at least 8 characters' })
  @Matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/, {
    message: 'Password must contain uppercase, lowercase, and a number',
  })
  password: string;

  @IsString()
  username: string;

  // GLOBAL SYSTEM ROLE
  @IsEnum(SYSTEM_ROLE)
  @IsOptional()
  systemRole?: SYSTEM_ROLE;

  // GYM CONTEXT (IMPORTANT)
  @IsUUID()
  gymId: string;

  @IsEnum(GYM_ROLE)
  @IsOptional()
  gymRole?: GYM_ROLE;
}
