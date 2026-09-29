// src/auth/dto/create-menu.dto.ts

import {
  IsOptional, // Marks the field as optional.
  IsString, // Ensures the value is a string.
  IsUUID, // Ensures the value is a UUID.
  MaxLength, // Enforces a maximum length.
  MinLength, // Enforces a minimum length.
} from 'class-validator';

import { Transform } from 'class-transformer';


export class CreateMenuDto {

  @IsUUID('4', { message: 'sectionId must be a valid UUID' })
  sectionId: string;


  @IsOptional()
  @IsUUID('4', { message: 'parentId must be a valid UUID' })
  parentId?: string;


  @IsString({ message: 'code must be a string' })
  @MinLength(2, { message: 'code must be at least 2 characters' })
  @MaxLength(80, { message: 'code must be at most 80 characters' })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    // Trim + uppercase. "  client  " → "CLIENT".
    return value.trim().toUpperCase();
  })
  code: string;


  @IsString({ message: 'name must be a string' })
  @MinLength(2, { message: 'name must be at least 2 characters' })
  @MaxLength(150, { message: 'name must be at most 150 characters' })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    return value.trim();
  })
  name: string;


  @IsOptional()
  @IsString({ message: 'route must be a string' })
  @MaxLength(200, { message: 'route must be at most 200 characters' })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  })
  route?: string | null;

 
  @IsOptional()
  @IsString({ message: 'icon must be a string' })
  @MaxLength(80, { message: 'icon must be at most 80 characters' })
  @Transform(({ value }) => {
    if (typeof value !== 'string') return value;
    const trimmed = value.trim();
    return trimmed === '' ? null : trimmed;
  })
  icon?: string | null;
}
