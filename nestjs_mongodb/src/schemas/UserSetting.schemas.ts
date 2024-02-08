import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserSetting {
  @Prop({ required: false, default: false })
  receiveNotifications?: boolean;

  @Prop({ required: false, default: false })
  receiveEmails?: boolean;

  @Prop({ required: false, default: false })
  receiveSms?: boolean;
}

export const userSettingSchema = SchemaFactory.createForClass(UserSetting);
