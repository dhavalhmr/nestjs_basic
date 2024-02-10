import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const token: string = req?.headers.authorization?.split(' ')[1];
    if (!token) throw new UnauthorizedException();
    next();
  }
}
