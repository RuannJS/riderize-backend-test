import {
  IsString,
  IsNotEmpty,
  MinLength,
  IsEmail,
  IsNumber,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  password: string;

  @IsEmail()
  email: string;
}
