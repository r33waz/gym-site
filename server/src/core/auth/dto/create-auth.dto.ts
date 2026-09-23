import { IsBoolean, IsDateString, IsEmail, IsEnum, IsIn, IsInt, IsOptional, IsString, Matches, Max, MaxLength, Min, MinLength } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { UserStatus } from '../../../constant/enum/common.enum';
export class SignupDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  @MaxLength(72)
  password: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  firstName: string;

  @IsString()
  @IsOptional()
  @Transform(({ value }) => value?.trim())
  middleName: string;

  @IsString()
  @Transform(({ value }) => value?.trim())
  lastName: string;

  @IsOptional()
  @IsString()
  @MaxLength(150)
  displayName?: string;

  @IsOptional()
  @Matches(/^\+?[0-9 \-()]{6,30}$/)
  phoneNumber?: string;
}

export class UserQueryDto {
  // Pagination
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit: number = 10;

  // General search
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  search?: string;

  // Name filters
  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  firstName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  middleName?: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => value?.trim())
  lastName?: string;

  // Contact filters
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  // Account filters
  @IsOptional()
  @IsEnum(UserStatus)
  status?: UserStatus;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  emailVerified?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  phoneVerified?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  twoFactorEnabled?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isPlatformAdmin?: boolean;

  // Created date
  @IsOptional()
  @IsDateString()
  createdFrom?: string;

  @IsOptional()
  @IsDateString()
  createdTo?: string;

  // Last login date
  @IsOptional()
  @IsDateString()
  lastLoginFrom?: string;

  @IsOptional()
  @IsDateString()
  lastLoginTo?: string;

  // Sorting
  @IsOptional()
  @IsIn(['firstName', 'lastName', 'email', 'createdAt', 'lastLoginAt'])
  sortBy?: string = 'createdAt';

  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC' = 'DESC';
}