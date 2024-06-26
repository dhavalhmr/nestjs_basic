import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserCommunicationEvent } from './createUserEvent';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @EventPattern('user_created')
  handleCreatedUser(data: CreateUserCommunicationEvent) {
    this.appService.handleCreatedUser(data);
  }
}
