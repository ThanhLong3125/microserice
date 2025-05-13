import { Controller } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { EventPattern, Payload, RpcException } from '@nestjs/microservices';
import { CreateNotificationDto, SendMessageDto } from '@socketfcm/common';

@Controller()
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) { }


  @EventPattern('create-notification')
  async handleTopic(@Payload() data: CreateNotificationDto) {
    try {
      await this.notificationService.createNotification(data);
    } catch (error) {
      throw new RpcException(`Kafka message processing failed: ${error.message}`);
    }
  }

  @EventPattern('checked')
  async sendMess(@Payload() payload: any) {
    console.log(payload)
    await this.notificationService.SendMessage(payload);
  }

  @EventPattern('Check_failed')
  async SendError(@Payload() payload: any) {
    return await this.notificationService.PushError(payload);
  }
}
