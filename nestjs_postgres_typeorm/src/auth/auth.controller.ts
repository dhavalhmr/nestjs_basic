import {
  Controller,
  HttpException,
  Inject,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    const user = req?.user;

    if (user) {
      const token = await this.authService.token(user);
      return { token, user };
    }
    throw new HttpException('Login failed', 401);
  }
}
