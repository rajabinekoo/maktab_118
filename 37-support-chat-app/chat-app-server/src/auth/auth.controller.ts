import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDTO, SignupDTO } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: SignupDTO) {
    return this.authService.signUp(body);
  }

  @Post('login')
  async login(@Body() body: LoginDTO) {
    return this.authService.login(body);
  }
}
