import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { Strategy } from 'passport-local';
import { comparePassword } from 'src/utils/bcryptjsHelper';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AUTH_SERVICE') private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'HFBWWHFufgwfg$^%@&$^%1344',
    });
  }

  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username);

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) throw new UnauthorizedException();

    return user;
  }
}
