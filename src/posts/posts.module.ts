import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from 'src/schemas/Post.schemas';
import { PostsService } from './posts.service';
import { PostController } from './posts.controller';
import { User, userSchema } from 'src/schemas/User.schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Post.name, schema: PostSchema },
      {
        name: User.name,
        schema: userSchema,
      },
    ]),
  ],
  controllers: [PostController],
  providers: [PostsService],
})
export class PostsModule {}
