import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request: Request = context.switchToHttp().getRequest();
    const token = request?.headers.authorization?.split(' ')[1];
    console.log('AuthGuard  token:', token);
    const payload = this.jwtService.verify(token);
    console.log('AuthGuard  payload:', payload);
    if (payload) return true;
    return false;
  }
}
