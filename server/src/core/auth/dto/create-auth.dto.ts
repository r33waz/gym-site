import { IsEmail, IsOptional, IsString, Matches, MaxLength, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';
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
  phone?: string;
}
