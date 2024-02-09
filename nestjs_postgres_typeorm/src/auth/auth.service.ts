import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/services/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_SERVICE')
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string) {
    const user = await this.userService.findUserByUsername(username);

    if (user) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { createdAt, updatedAt, deletedAt, ...userProfile } = user;
      return userProfile;
    }

    throw new UnauthorizedException();
  }

  token(user: any) {
    const { username, id } = user;
    const payload = { username, sub: id };
    return { access_token: this.jwtService.sign(payload) };
  }
}
