import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateAuthenticationDto {
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  readonly password: string;
}
