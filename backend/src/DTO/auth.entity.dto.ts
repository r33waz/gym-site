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

/**
 * @swagger
 * components:
 *   schemas:
 *     IForgetPasswordDto:
 *       type: object
 *       required:
 *         - email
 *       properties:
 *         email:
 *           type: string
 *           example: admin@gym.com
 */

export class IForgetPasswordDto {
  @IsEmail()
  @IsString()
  email: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     IResetPasswordDto:
 *       type: object
 *       required:
 *         - email
 *         - otp
 *         - password
 *         - confirmPassword
 *       properties:
 *         email:
 *           type: string
 *           example: admin@gym.com
 *         otp:
 *           type: string
 *           example: 123456
 *         password:
 *           type: string
 *           example: newpassword123
 *         confirmPassword:
 *           type: string
 *           example: newpassword123
 */
export class IResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  otp: string;

  @IsString()
  password: string;

  @IsString()
  confirmPassword: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     IChangePasswordDto:
 *       type: object
 *       required:
 *         - oldPassword
 *         - password
 *         - confirmPassword
 *       properties:
 *         oldPassword:
 *           type: string
 *           example: oldpassword123
 *         password:
 *           type: string
 *           example: newpassword123
 *         confirmPassword:
 *           type: string
 *           example: newpassword123

 */
export class IChangePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;

  @IsString()
  confirmNewPassword: string;
}
