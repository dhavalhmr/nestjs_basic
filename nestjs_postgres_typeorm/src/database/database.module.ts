import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/User';
import { Profile } from './entities/Profile';
import { Post } from './entities/Post';
import { Module } from '@nestjs/common';
import { dataSourcesOptions } from './data-source';

const repositories = TypeOrmModule.forFeature([User, Profile, Post]);

@Module({
  imports: [TypeOrmModule.forRoot(dataSourcesOptions), repositories],
  exports: [repositories],
})
export class DatabaseModule {}
