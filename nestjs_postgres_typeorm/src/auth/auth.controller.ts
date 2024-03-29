import {
  Body,
  Controller,
  Get,
  HttpException,
  Inject,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './passport/strategy/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { AuthPayloadDto } from './auth.dto';
import { CreateUserDto } from '../users/dto/users.dto';
import { UsersService } from '../users/services/users/users.service';
import { AuthenticatedGuard } from './authenticated.guard';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private authService: AuthService,
    private jwtService: JwtService,
    private userService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(LoggingInterceptor)
  @Post('login')
  login(@Request() req) {
    const body: AuthPayloadDto = req?.body;
    if (!body) throw new UnauthorizedException();

    const user = req?.user;

    if (user) {
      const token = this.jwtService.sign(user);
      return { user, token, message: 'logged In' };
    }
    throw new HttpException('Login failed', 401);
  }

  @Post()
  createUsers(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @UseGuards(AuthenticatedGuard)
  @Get()
  getUsers(@Request() req) {
    console.log('<=======================', req.user);

    return this.userService.findUser();
  }
}
