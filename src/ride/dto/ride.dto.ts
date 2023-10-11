import {
  IsNotEmpty,
  IsString,
  IsOptional,
  IsNumber,
  IsDateString,
} from 'class-validator';

export class CreateRideDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  @IsNotEmpty()
  start_date: Date;

  @IsDateString()
  @IsNotEmpty()
  start_date_registration: Date;

  @IsDateString()
  @IsNotEmpty()
  end_date_registration: Date;

  @IsString()
  @IsOptional()
  additonal_information?: string;

  @IsString()
  @IsNotEmpty()
  start_place: string;

  @IsNumber()
  @IsOptional()
  participants_limit?: number;
}
