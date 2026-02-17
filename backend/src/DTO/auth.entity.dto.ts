import { IsBoolean, IsEmail, IsString } from "class-validator";

export class AuthEntityDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  is_email_verified: boolean;
}

export class ILoginDto {
  @IsEmail()
  @IsString()
  email: string;

  @IsString()
  password: string;
}

export class IForgetPasswordDto {
  @IsEmail()
  @IsString()
  email: string;
}

export class IResetPasswordDto {
  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}

export class IChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;

  @IsString()
  confirmNewPassword: string;
}

