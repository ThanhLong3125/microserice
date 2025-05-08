import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { SocketModule } from '@socketfcm/core';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    SocketModule,
    ClientsModule.register([
      {
        name: 'Notification_package',
        transport: Transport.GRPC,
        options: {
          package: 'notification',
          protoPath: join(process.cwd(), 'libs/common/src/lib/proto/notification.proto'),
          url: 'localhost:50052',
        }
      }
    ])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
})
export class NotificationModule { }
