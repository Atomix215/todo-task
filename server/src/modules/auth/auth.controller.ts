import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDTO } from './dto/signup.dto';
import { LoginDTO } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signUp(@Body() singUpPayload: SignupDTO): Promise<{
    message: string;
  }> {
    return this.authService.signUp(singUpPayload);
  }

  @Post('login')
  async login(@Body() loginPayload: LoginDTO): Promise<{
    token: string;
  }> {
    return this.authService.login(loginPayload);
  }
}
