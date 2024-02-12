import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './middleware/jwt.module';
import { dataSources } from './database/dataSource';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSources;
      },
    }),
    UsersModule,
    AuthModule,
    JwtModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
