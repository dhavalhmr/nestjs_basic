import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    console.log('----------------------->', request.user);

    const token = request?.headers.authorization?.split(' ')[1];

    const payload = this.jwtService.verify(token);
    if (payload) return true;

    return false;
  }
}
