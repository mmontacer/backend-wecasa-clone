import { IsEmail, IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';

export class AuthDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  password: string;
}
