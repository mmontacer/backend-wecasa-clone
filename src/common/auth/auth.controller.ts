import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup-client')
  signupClient(@Body() dto: AuthDto) {
    return this.authService.signupClient(dto);
  }
  @Post('signin-client')
  signinClient(@Body() dto: AuthDto) {
    return this.authService.signinClient(dto);
  }

  @Post('signup-pro')
  signupProfessional(@Body() dto: AuthDto) {
    return this.authService.signupProfessional(dto);
  }
  @Post('signin-pro')
  signinProfessional(@Body() dto: AuthDto) {
    return this.authService.signinProfessional(dto);
  }
}
