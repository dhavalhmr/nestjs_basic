import { Injectable } from '@nestjs/common';
import { CreateUserCommunicationEvent } from './createUserEvent';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  handleCreatedUser(data: CreateUserCommunicationEvent) {
    console.log('handleCreatedUser - communications', data);
  }
}
