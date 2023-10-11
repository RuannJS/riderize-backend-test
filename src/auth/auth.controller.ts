import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly Service: AuthService) {}

  @Post('/register')
  async register(@Body() body: RegisterDto) {
    return await this.Service.register(body);
  }

  @Post('/login')
  async login(@Body() body: LoginDto) {
    return await this.Service.login(body);
  }
}
