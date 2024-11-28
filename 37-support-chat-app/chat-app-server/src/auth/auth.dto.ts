import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignupDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class LoginDTO {
  @IsString()
  @IsNotEmpty()
  refresh_token: string;
}

export class SignupResDTO {
  access_token: string;
  refresh_token: string;
}

export class LoginResDTO {
  @IsString()
  @IsNotEmpty()
  access_token: string;
}
