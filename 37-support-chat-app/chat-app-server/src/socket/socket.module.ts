import { Module, OnModuleInit } from '@nestjs/common';
import { MongooseModule, InjectModel } from '@nestjs/mongoose';
import { SocketGateway } from './socket.gateway';
import { Chat, ChatSchema } from 'src/schema/chat.schema';
import { User, UserSchema } from 'src/schema/user.schema';
import { IoRedisProvider } from 'src/ioredis.provider';
import { Model } from 'mongoose';
import { v4 as uuidV4 } from 'uuid';
import { AuthModule } from '../auth/auth.module';
import { Room, RoomSchema } from '../schema/room.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chat.name, schema: ChatSchema },
      { name: User.name, schema: UserSchema },
      { name: Room.name, schema: RoomSchema },
    ]),
    AuthModule,
  ],
  providers: [SocketGateway, IoRedisProvider],
})
export class SocketModule implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async onModuleInit() {
    const adminUser = await this.userModel.findOne({ isAdmin: true });
    if (!!adminUser) return console.log('Admin already exist');

    let uniqueString: string = uuidV4();
    let duplicatedUser = await this.userModel.findOne({
      refreshToken: uniqueString,
    });

    while (!!duplicatedUser) {
      uniqueString = uuidV4();
      duplicatedUser = await this.userModel.findOne({
        refreshToken: uniqueString,
      });
    }

    await this.userModel.create({ isAdmin: true, refreshToken: uniqueString });
    console.log('Admin created');
  }
}
