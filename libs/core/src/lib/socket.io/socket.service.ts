import { Injectable, Logger } from "@nestjs/common";
import { ConnectedSocket, MessageBody, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Socket } from "socket.io";
import { Notificationfcmdto } from "@socketfcm/common";
import { FcmService } from "../firebase/fcm.service";

@Injectable()
@WebSocketGateway(8089, {
  cors: {
    origin: '*',
    credentials: true
  }
})
export class SocketService implements OnGatewayDisconnect {
  @WebSocketServer()
  server: any;

  private readonly logger = new Logger(SocketService.name);
  private readonly connectedSocket = new Map<string, Socket>();
  private readonly connectedFcmtokens = new Map<string, string>();
  constructor(private readonly fcmservice: FcmService) { }

  @SubscribeMessage('register')
  handleRegister(@MessageBody() data: { fcmToken: string }, @ConnectedSocket() client: Socket) {
    this.connectedSocket.set(client.id, client);
    this.connectedFcmtokens.set(client.id, data.fcmToken);
    const fcm = this.connectedFcmtokens.get(client.id)
    this.logger.log(`Socket Id ${client.id} registered for user ${fcm}`);
  }

  handleDisconnect(client: Socket) {
    this.connectedSocket.delete(client.id);
    this.logger.warn(`Socket Id ${client.id} disconnected`);
  }

  async sendNotificationToUser(clientId: string, notification: any) {
    const client = this.connectedSocket.get(clientId);
    if (client) {
      client.emit('notification', notification);
      this.logger.log(`Notification sent to user ${clientId} via WebSocket`);
    } else {
      const fcmToken = this.connectedFcmtokens.get(clientId);
      const fcmNotification: Notificationfcmdto = {
        title: 'Notification from FCM',
        body: 'Check notification',
        data: notification.message,
        deviceId: fcmToken
      }
      await this.fcmservice.sendPush(fcmNotification);
      this.logger.warn(`Notification sent to user ${clientId} via FCM`);
    }
  }

  async sendMessage(clientId: string, body: any) {
    const client = this.connectedSocket.get(clientId);
    if (client) {
      client.emit('notification', body);
      this.logger.log(`Message sent to user`);
    } else {
      const fcmToken = this.connectedFcmtokens.get(clientId);
      const fcmNotification: Notificationfcmdto = {
        title: 'Notification from ChatSGOD',
        body: 'U have 1 message',
        data: body.message,
        deviceId: fcmToken
      }
      await this.fcmservice.sendPush(fcmNotification);
      this.logger.warn(`Pushed Notification`);
    }
  }

  async pushNotification(clientId: string, message: string) {
    const fcmToken = this.connectedFcmtokens.get(clientId);
    const fcmNotification: Notificationfcmdto = {
      title: 'Notification from ChatSGOD',
      body: 'U have 1 message',
      data: message,
      deviceId: fcmToken
    }
    await this.fcmservice.sendPush(fcmNotification);
    this.logger.warn(`Pushed Notification`);
  }
}
