import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Socket } from 'socket.io';
import { AuthService } from '../auth/auth.service';
import { IoRedisProvider } from '../ioredis.provider';

@Injectable()
export class SocketGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly ioRedis: IoRedisProvider,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Socket = context.switchToWs().getClient();
    return this.authService.authorization(request);
  }
}
