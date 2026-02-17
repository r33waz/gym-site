import { IsOptional, IsString, IsUUID, Length } from "class-validator";
import { USER_ROLE_TYPE } from "../constant/types";

export class CreateUserDTO {
  @IsUUID()
  authId!: string; // links to auth.id

  @IsString()
  role!: USER_ROLE_TYPE;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  firstName?: string;

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
}

export class UpdateUserDTO {
  @IsOptional()
  role?: USER_ROLE_TYPE;

  @IsOptional()
  @IsString()
  @Length(2, 50)
  firstName?: string;

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
}
