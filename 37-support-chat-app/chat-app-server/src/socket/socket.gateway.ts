import { OnModuleInit, UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, Types } from 'mongoose';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Chat } from 'src/schema/chat.schema';
import { User } from 'src/schema/user.schema';
import { SocketGuard } from './socket.guard';
import {
  Error,
  JoinResponse,
  NewMessageResponse,
  RoomResponse,
} from '../app.dto';
import { AuthService } from '../auth/auth.service';
import { Room } from '../schema/room.schema';

@UseGuards(SocketGuard)
@WebSocketGateway(8080, { cors: true })
export class SocketGateway implements OnModuleInit {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    @InjectModel(Chat.name) private readonly chatModel: Model<Chat>,
    @InjectModel(Room.name) private readonly roomModel: Model<Room>,
    private readonly authService: AuthService,
  ) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      console.log(`Client with clientId: ${socket.id} connected.`);
      const authorized = await this.authService.authorization(socket);
      if (authorized) {
        await this.authService.setOnline(socket);
        if (!!socket?.data?.user?.isAdmin) {
          this.server.emit('adminIsOnline', 'how can i help you');
        }
      }
    });
  }

  @SubscribeMessage('ping')
  async subscribeOnPing(@ConnectedSocket() client: Socket): Promise<string> {
    return `Ping comes from ${client.data?.user?.email}, then server returns pong as response.`;
  }

  @SubscribeMessage('checkAdminIsOnline')
  async subscribeOnCheckAdminIsOnline(): Promise<boolean> {
    const admin = await this.userModel.findOne({
      isAdmin: true,
      isOnline: true,
    });
    return Boolean(admin);
  }

  @SubscribeMessage('join')
  async subscribeOnJoin(
    @ConnectedSocket() client: Socket,
  ): Promise<JoinResponse> {
    if (!!client.data?.user?.isAdmin) {
      client.emit(
        'error',
        new Error(
          "You can't to join room because system will automatically add you.",
        ),
      );
      return;
    }
    if (!!client.data?.roomId) {
      client.emit('error', new Error('Already join to chat.'));
      return;
    }
    const rooms = await this.roomModel.find().populate('admin');
    const busyAdmins: mongoose.Schema.Types.ObjectId[] = await rooms.map(
      (el) => el.admin._id,
    );
    let admin = await this.userModel.findOne({
      isAdmin: true,
      isOnline: true,
      _id: { $not: { $in: busyAdmins } },
    });
    if (!admin && busyAdmins?.length !== 0) {
      const index = Math.floor(Math.random() * busyAdmins.length);
      const id = busyAdmins[index];
      admin = await this.userModel.findById(id);
    }

    if (!!admin && admin.isOnline) {
      const room = await this.roomModel.create({
        admin,
        customer: client.data.user._id,
      });
      client.data.roomId = room._id.toString();
      client.join(client.data.roomId);
      this.server.emit(
        `${admin._id.toString()}-newRoom`,
        JSON.stringify(
          new RoomResponse(client.data.user.email, room._id.toString()),
        ),
      );
      client.on('disconnect', async () => {
        const targetRoom = await this.roomModel
          .findById(room.id)
          .populate('chats');
        console.log(targetRoom);
        for (const chat of targetRoom.chats) {
          await this.chatModel.findByIdAndRemove(chat._id);
        }
        await targetRoom.deleteOne();
      });
      return new JoinResponse(
        client.data.user._id.toString(),
        client.data.roomId,
      );
    } else {
      client.emit(
        'error',
        new Error('Admins are offline or busy, Please try again later.'),
      );
    }
  }

  @SubscribeMessage('joinByAdmin')
  async subscribeOnJoinByAdmin(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ): Promise<{ list: NewMessageResponse[]; clientId: string }> {
    if (!client.data?.user?.isAdmin) {
      client.emit(
        'error',
        new Error(
          "You can't to join room because system will automatically add you.",
        ),
      );
      return;
    }
    if (!roomId) {
      client.emit('error', new Error('Bad requset.'));
      return;
    }
    const room = await this.roomModel.findById(roomId).populate('chats');
    if (!room && room.admin !== client.data?.user?._id) {
      client.emit('error', new Error('Room not found.'));
      return;
    }
    client.join(room._id.toString());
    if (!!client.data.roomId) {
      client.leave(client.data.roomId);
    }
    client.data.roomId = room._id.toString();
    return {
      list: room.chats.map(
        (el) =>
          new NewMessageResponse(
            el._id.toString(),
            el.context,
            el.from.toString(),
            el.to.toString(),
            el.createdAt.toISOString(),
          ),
      ),
      clientId: client.data.user._id.toString(),
    };
  }

  @SubscribeMessage('leaveByAdmin')
  async subscribeOnLeaveByAdmin(
    @ConnectedSocket() client: Socket,
  ): Promise<boolean> {
    if (!client.data?.user?.isAdmin) {
      client.emit(
        'error',
        new Error(
          "You can't to join room because system will automatically add you.",
        ),
      );
      return;
    }
    if (!!client.data.roomId) {
      client.leave(client.data.roomId);
      return true;
    }
    return false;
  }

  @SubscribeMessage('fetchRooms')
  async subscribeOnFetchRooms(
    @ConnectedSocket() client: Socket,
  ): Promise<{ clientId: string; list: RoomResponse[] }> {
    if (!client.data?.user?.isAdmin) {
      client.emit(
        'error',
        new Error(
          "You can't to join room because system will automatically add you.",
        ),
      );
      return;
    }
    const rooms = await this.roomModel
      .find({ admin: client.data.user._id })
      .populate('customer');
    return {
      list: rooms.map(
        (el) => new RoomResponse(el.customer.email, el._id.toString()),
      ),
      clientId: client.data.user._id,
    };
  }

  @SubscribeMessage('newMessage')
  async subscribeOnNewMessage(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ): Promise<NewMessageResponse> {
    if (typeof message !== 'string' || !message?.trim?.()) {
      client.emit(
        'error',
        new Error('Invalid request body. Message field is required.'),
      );
      return;
    }
    if (!client.data.roomId) {
      client.emit('error', new Error('Please join chat first.'));
      return;
    }
    const room = await this.roomModel.findById(client.data.roomId);
    if (!room && room.customer !== client.data?.user?._id) {
      client.emit('error', new Error('Room not found.'));
      return;
    }
    const chat = await this.chatModel.create({
      context: message,
      from: client.data.user?._id?.toString?.(),
      to: !!client?.data?.user?.isAdmin ? room.customer : room.admin,
    });
    if (!!room.chats) room.chats.push(chat);
    else room.chats = [chat];
    await room.save();
    this.server
      .to(room._id.toString())
      .emit(
        'receiveMessage',
        JSON.stringify(
          new NewMessageResponse(
            chat._id.toString(),
            chat.context,
            chat.from.toString(),
            chat.to.toString(),
            chat.createdAt.toISOString(),
          ),
        ),
      );
  }
}
