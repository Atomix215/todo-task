import { IsEmail, IsNotEmpty, IsObject, IsString } from 'class-validator';

export class LoginReqDTO {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

export class LoginResDTO {
  @IsString()
  @IsNotEmpty()
  token: string;

  @IsObject()
  @IsNotEmpty()
  user: {
    id: string;
    name: string;
    email: string;
  };
}
