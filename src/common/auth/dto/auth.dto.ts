import { IsEmail, IsNotEmpty, IsString, Matches, ValidateNested } from 'class-validator';

export class AuthDto {
  
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @IsString()
  @IsNotEmpty()
  // @Matches('/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/')
  password: string;
}
