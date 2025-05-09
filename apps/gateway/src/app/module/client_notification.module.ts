import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientNotificationService } from "../service/client_notification.service";
import { ClientNotificationController } from "../controller/client_notification.controller";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'NOTIFICATION_KAFKA',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'notification',
                        brokers: ['localhost:9092'],
                    },
                    consumer: {
                        groupId: 'notification-cosumer'
                    },
                    producer: {
                        allowAutoTopicCreation: true,
                    },
                }
            },
        ])],
    controllers: [ClientNotificationController],
    providers: [ClientNotificationService],
})
export class ClientNotificationModule { }