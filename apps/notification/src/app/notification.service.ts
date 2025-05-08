import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { NotificationDto, NotificationGRPC, CreateNotificationDto } from '@socketfcm/common';
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
}
