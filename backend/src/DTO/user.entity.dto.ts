import { IsNumber, IsOptional, IsString, Length } from "class-validator";
import { USER_ROLE_TYPE } from "../constant/types";

/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUserDTO:
 *       type: object
 *       required:
 *         - role
 *         - firstName
 *         - lastName
 *         - phone
 *         - address
 *         - gymId
 *       properties:
 *         role:
 *           type: string
 *           example: "admin"
 *         firstName:
 *           type: string
 *           example: "John"
 *         middleName:
 *           type: string
 *           example: "Doe"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         phone:
 *           type: string
 *           example: "1234567890"
 *         address:
 *           type: string
 *           example: "123 Main St"
 *         profilePicture:
 *           type: string
 *           example: "https://example.com/profile.jpg"
 *         gender:
 *           type: string
 *           example: "male"
 *         dateOfBirth:
 *           type: string
 *           example: "1990-01-01"
 *         bloodGroup:
 *           type: string
 *           example: "A+"
 *         height:
 *           type: string
 *           example: "5'10"
 *         weight:
 *           type: string
 *           example: "150"
 *         emergencyContactName:
 *           type: string
 *           example: "Jane Doe"
 *         emergencyContactRelationship:
 *           type: string
 *           example: "Mother"
 *         emergencyContactPhone:
 *           type: string
 *           example: "0987654321"
 *         gymId:
 *           type: string
 *           example: "123e4567-e89b-12d3-a456-426614174000"
 */
export class CreateUserDTO {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsString()
  role!: USER_ROLE_TYPE;

  @IsString()
  @Length(2, 50)
  firstName: string;

  @IsString()
  @IsOptional()
  @Length(2, 50)
  middleName: string;

  @IsString()
  @Length(2, 50)
  lastName: string;

  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactRelationship?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  // gyym id
  @IsString()
  gymId: string;
}

/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUserDTO:
 *       type: object
 *       properties:
 *         role:
 *           type: string
 *           example: "admin"
 *         firstName:
 *           type: string
 *           example: "John"
 *         middleName:
 *           type: string
 *           example: "Doe"
 *         lastName:
 *           type: string
 *           example: "Doe"
 *         phone:
 *           type: string
 *           example: "1234567890"
 *         address:
 *           type: string
 *           example: "123 Main St"
 *         profilePicture:
 *           type: string
 *           example: "https://example.com/profile.jpg"
 *         gender:
 *           type: string
 *           example: "male"
 *         dateOfBirth:
 *           type: string
 *           example: "1990-01-01"
 *         bloodGroup:
 *           type: string
 *           example: "A+"
 *         height:
 *           type: number
 *           example: 180
 *         weight:
 *           type: number
 *           example: 75
 *         emergencyContactName:
 *           type: string
 *           example: "Jane Doe"
 *         emergencyContactRelationship:
 *           type: string
 *           example: "Mother"
 *         emergencyContactPhone:
 *           type: string
 *           example: "0987654321"
 */

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;

  @IsOptional()
  @IsString()
  role?: USER_ROLE_TYPE;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  firstName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  middleName?: string;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  lastName?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  profilePicture?: string;

  @IsOptional()
  @IsString()
  gender?: string;

  @IsOptional()
  @IsString()
  dateOfBirth?: string;

  @IsOptional()
  @IsString()
  bloodGroup?: string;

  @IsOptional()
  @IsNumber()
  height?: number;

  @IsOptional()
  @IsNumber()
  weight?: number;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactRelationship?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;
}

export class DeleteUserDTO {
  @IsString()
  userId: string;
}
