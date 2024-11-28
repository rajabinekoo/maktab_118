import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { mongodbUrl } from './app.config';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SocketModule } from './socket/socket.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [MongooseModule.forRoot(mongodbUrl), SocketModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
