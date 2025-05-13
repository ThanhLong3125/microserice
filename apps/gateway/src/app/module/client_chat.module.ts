import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";

import { ClientChatController } from "../controller/chat.controller";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'CHAT_KAFKA',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'chat',
                        brokers: ['localhost:9092'],
                    },
                    consumer: {
                        groupId: 'chat-cosumer'
                    },
                    producer: {
                        allowAutoTopicCreation: true,
                    },
                }
            },
        ])],
    controllers: [ClientChatController],
})
export class CLientChatModule { }