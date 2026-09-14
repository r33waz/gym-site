import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsNumber()
  id: number;
  
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsEnum(['admin', 'user'], { message: 'Role must be either admin or user' })
  @IsOptional()
  role: 'admin' | 'user';

  @IsBoolean()
  @IsOptional()
  isActive: boolean;
}
