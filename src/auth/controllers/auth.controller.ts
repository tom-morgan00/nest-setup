import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { UserEntity } from 'src/user/entities';
import { RegisterDto } from '../dtos';
import { AuthService } from '../services';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  async register(@Body() registerDto: RegisterDto): Promise<UserEntity> {
    return this.authService.register(registerDto);
  }
}
