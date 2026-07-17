import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupReqDTO } from './dto/signup.dto';
import { LoginReqDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() singUpPayload: SignupReqDTO): Promise<{
    message: string;
  }> {
    return this.authService.signUp(singUpPayload);
  }

  @Post('login')
  async login(@Body() loginPayload: LoginReqDTO): Promise<{
    token: string;
  }> {
    return this.authService.login(loginPayload);
  }
}
