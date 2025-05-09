import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { CreateNotificationDto } from "@socketfcm/common";

@Injectable()
export class ClientNotificationService implements OnModuleInit {
    constructor(@Inject('NOTIFICATION_KAFKA') private readonly kafkaService: ClientKafka) { }

    async onModuleInit() {
        await this.kafkaService.connect();
    }
    async createNotification(payload: CreateNotificationDto): Promise<any> {
        const request = { ...payload };
        this.kafkaService.emit('create-notification', request);
    }
}