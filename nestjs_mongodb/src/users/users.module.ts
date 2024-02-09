import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from 'src/schemas/User.schemas';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import {
  UserSetting,
  userSettingSchema
} from 'src/schemas/UserSetting.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: userSchema
      },
      {
        name: UserSetting.name,
        schema: userSettingSchema
      }
    ])
  ],
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('users'); // we can use middleware here in parameters of apply function
  }
}
