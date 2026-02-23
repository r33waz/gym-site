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

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginDTO:
 *       type: object
 *       required:
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           example: admin@gym.com
 *         username:
 *           type: string
 *           example: admin123
 *         password:
 *           type: string
 *           example: password123
 */
export class ILoginDto {
  @IsEmail()
  @IsString()
  email?: string;

  @IsString()
  username?: string;

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
