import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { UserSetting } from './UserSetting.schemas';
import mongoose from 'mongoose';
import { Post } from './Post.schemas';

@Schema()
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: false })
  displayName?: string;

  @Prop({ required: false })
  avatarUrl?: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'UserSetting' })
  settings?: UserSetting;

  @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }])
  posts: Post[];
}

export const userSchema = SchemaFactory.createForClass(User);
