import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGymDto {
  @IsString()
  @IsNotEmpty()
  gymnameEn: string;

  @IsString()
  @IsNotEmpty()
  gymnameNp: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  address: string;

  @IsString()
  @IsNotEmpty()
  phoneNumer: string;

  @IsString()
  @IsNotEmpty()
  telNumber: string;
}
