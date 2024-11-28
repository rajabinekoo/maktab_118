import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from './user.schema';
import { Chat } from './chat.schema';

export type RoomDocument = HydratedDocument<Room>;

@Schema({ timestamps: true })
export class Room {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  customer: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false })
  admin: User;

  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Chat' }] })
  chats: Chat[];

  createdAt: Date;
  updatedAt: Date;
  _id: mongoose.Schema.Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
