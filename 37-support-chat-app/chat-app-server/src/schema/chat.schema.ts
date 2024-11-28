import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';

export type ChatDocument = HydratedDocument<Chat>;

@Schema({ timestamps: true })
export class Chat {
  @Prop()
  context: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  from: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  to: User;

  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Schema.Types.ObjectId;
}

export const ChatSchema = SchemaFactory.createForClass(Chat);
