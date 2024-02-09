import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const token = req?.headers.authorization?.split(' ');
    if (!token) throw new UnauthorizedException();
    next();
  }
}
