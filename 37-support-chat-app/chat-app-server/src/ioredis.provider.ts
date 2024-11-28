import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class IoRedisProvider {
  public readonly redis: Redis;
  public readonly nonceExpireTime: number;

  constructor() {
    this.redis = new Redis({
      port: 6379,
      host: '127.0.0.1',
    });
    this.nonceExpireTime = 3600;
  }
}
