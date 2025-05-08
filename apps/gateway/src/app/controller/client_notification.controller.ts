import { Controller, Logger, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiQuery, ApiTags } from "@nestjs/swagger";
import { ClientNotificationService } from "../service/client_notification.service";
import { notificationMessage, CreateNotificationDto } from "@socketfcm/common";

@ApiTags('Notification')
@Controller('notification')
export class ClientNotificationController {
  private readonly logger = new Logger(ClientNotificationController.name);
  constructor(
    private readonly clientNotificationService: ClientNotificationService
  ) { console.log(this.clientNotificationService) }

  @Post('send-notification')
  @ApiOperation({ summary: 'Send a notification to a user' })
  @ApiQuery({ name: 'notification', enum: notificationMessage, required: true })
  @ApiQuery({ name: 'id', type: String, required: true })
  async create_Notification(@Query('id') id: string, @Query('notification') notification: notificationMessage): Promise<any> {
    const payload: CreateNotificationDto = { id: id, message: notification };
    try {
      await this.clientNotificationService.createNotification(payload);
      return { message: 'Notification sent successfully' };
    }
    catch (error) {
      this.logger.error('Error sending notification:', error);
    }
  }
}