import { IsBoolean, IsEmail, IsString } from 'class-validator';

export class ILoginDto {
  @IsEmail()
  @IsString()
  email?: string;

  @IsString()
  username?: string;

  @IsString()
  password!: string;
}

export class IForgetPasswordDto {
  @IsEmail()
  @IsString()
  email!: string;
}

export class IResetPasswordDto {
  @IsEmail()
  email!: string;W

  @IsString()
  otp!: string;

  @IsString()
  password!: string;

  @IsString()
  confirmPassword?: string;
}

export class IChangePasswordDto {
  @IsString()
  oldPassword!: string;

  @IsString()
  newPassword!: string;

  @IsString()
  confirmNewPassword?: string;
}
