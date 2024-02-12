import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import 'dotenv/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from './middleware/jwt.module';
import { dataSourcesOptions } from './database/data-source';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return dataSourcesOptions;
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
