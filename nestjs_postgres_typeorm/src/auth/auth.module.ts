import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../database/entities/User';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/services/users/users.service';
import { Profile } from '../database/entities/Profile';
import { Post } from '../database/entities/Post';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './passport/strategy/local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { Serializer } from './passport/serialize.passport';
import { LoggingInterceptor } from '../interceptor/logging.interceptor';
import { RequestService } from '../request.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Profile, Post, UsersModule]),
    PassportModule.register({ session: true }),
    JwtModule.register({
      secret: 'HFBWWHFufgwfg$^%@&$^%1344',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [
    { provide: 'AUTH_SERVICE', useClass: AuthService },
    { provide: 'USER_SERVICE', useClass: UsersService },
    LocalStrategy,
    UsersService,
    Serializer,
    LoggingInterceptor,
    RequestService,
  ],
  controllers: [AuthController],
  exports: [JwtModule],
})
export class AuthModule {}
