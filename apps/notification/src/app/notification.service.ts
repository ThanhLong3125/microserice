import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NotificationDto, NotificationGRPC, CreateNotificationDto, SendMessageDto } from '@socketfcm/common';
import { ClientGrpc } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { SocketService } from '@socketfcm/core';

@Injectable()
export class NotificationService implements OnModuleInit {
  private readonly logger = new Logger(NotificationService.name);
  private notificationgrpc: NotificationGRPC
  constructor(
    @Inject('Notification_package') private readonly client: ClientGrpc,
    private readonly socketservice: SocketService
  ) { }

  onModuleInit() {
    try {
      this.notificationgrpc = this.client.getService<NotificationGRPC>('NotificationService1');
      this.logger.log('gRPC client initialized successfully');
    } catch (err) {
      this.logger.error('Error initializing gRPC client:', err);
    }
  }

  async createNotification(payload: CreateNotificationDto): Promise<any> {
    console.log(payload)
    const Time: Date = new Date();
    const notification: NotificationDto = {
      id: payload.id,
      message: {
        message: payload.message,
        createdAt: `${Time}`,
      }
    }
    try {
      await this.socketservice.sendNotificationToUser(payload.id, notification);
      await firstValueFrom(this.notificationgrpc.sendNotification1('successfull'));
      this.logger.log('Notification sent successfully');
    } catch (err) {
      this.logger.error('Error sending notification:', err);
    }
  }

  async SendMessage(payload: any) {
    try {
      const Idreceive = payload.payload.Idreceive
      const body = {
        IdSent: payload.payload.IdSend,
        message: payload.payload.message,
        file: payload.payload.file
      }
      if (payload.valid == false) {
        return this.socketservice.pushNotification(Idreceive, 'Error SendFile')
      }
      await this.socketservice.sendMessage(Idreceive, body);
    } catch (err) {
      const Idreceive = payload.Idreceive
      await this.socketservice.pushNotification(Idreceive, 'Error Send Message');
    }
  }

  async PushError(payload: any) {
    const Idreceive = payload.Idreceive
    const message = payload.message
    await this.socketservice.pushNotification(Idreceive, message);
  }
}
