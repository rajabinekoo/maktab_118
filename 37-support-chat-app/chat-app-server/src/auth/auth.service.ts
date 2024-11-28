import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User, UserDocument } from 'src/schema/user.schema';
import { IoRedisProvider } from 'src/ioredis.provider';
import { v4 as uuidV4 } from 'uuid';
import { SignupDTO, LoginDTO, SignupResDTO } from './auth.dto';
import { Error } from '../app.dto';
import { Socket } from 'socket.io';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private readonly redisProvider: IoRedisProvider,
  ) {}

  public async generateToken(user: UserDocument): Promise<string> {
    let accessToken: string = uuidV4();
    let duplicatedUserToken = await this.redisProvider.redis.get(accessToken);

    while (!!duplicatedUserToken) {
      accessToken = uuidV4();
      duplicatedUserToken = await this.redisProvider.redis.get(accessToken);
    }

    await this.redisProvider.redis.set(
      user._id.toString(),
      accessToken,
      'EX',
      3600,
    );
    await this.redisProvider.redis.set(
      accessToken,
      user._id.toString(),
      'EX',
      3600,
    );
    return accessToken;
  }

  public async findUserById(id: string) {
    return this.userModel.findById(id);
  }

  public async signUp(body: SignupDTO): Promise<SignupResDTO> {
    const targetUser = await this.userModel.findOne({
      email: body.email.trim(),
    });
    if (!!targetUser) {
      const access_token = await this.generateToken(targetUser);
      return { access_token, refresh_token: targetUser.refreshToken };
    }

    let uniqueString: string = uuidV4();
    let duplicatedUser: UserDocument = await this.userModel.findOne({
      refreshToken: uniqueString,
    });

    while (!!duplicatedUser) {
      uniqueString = uuidV4();
      duplicatedUser = await this.userModel.findOne({
        refreshToken: uniqueString,
      });
    }

    const newUser = await this.userModel.create({
      email: body.email.trim(),
      refreshToken: uniqueString,
    });
    const access_token = await this.generateToken(newUser);
    return { access_token, refresh_token: uniqueString };
  }

  public async login(body: LoginDTO) {
    const targetUser = await this.userModel.findOne({
      refreshToken: body.refresh_token,
    });
    if (!targetUser) {
      throw new NotFoundException('User not found');
    }
    const access_token = await this.generateToken(targetUser);
    return { access_token };
  }

  public async authorization(request: Socket): Promise<boolean> {
    const access_token = request?.handshake?.headers?.['authorization'];
    if (!access_token) {
      request.emit('error', new Error('Authorization header required'));
      return false;
    }
    const userId = await this.redisProvider.redis.get(access_token);
    if (!userId) {
      request.emit('error', new Error('User not found'));
      return false;
    }
    const user = await this.userModel.findById(userId);
    if (!user) {
      request.emit('error', new Error('User not found'));
      return false;
    }
    request.data['user'] = user;
    return true;
  }

  public async setOnline(request: Socket): Promise<void> {
    const user = await this.userModel.findById(request.data.user._id);
    if (!user) return;
    user.isOnline = true;
    await user.save();
    request.on('disconnect', async () => {
      user.isOnline = false;
      await user.save();
    });
  }
}
