import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SocketModule } from '@socketfcm/core';

@Module({
    imports: [
        SocketModule,
        CqrsModule,
        ClientsModule.register([
            {
                name: 'CHAT_SERVER_KAFKA',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'chat_serve',
                        brokers: ['localhost:9092'],
                    },
                    consumer: {
                        groupId: 'chat_serve-cosumer'
                    },
                    producer: {
                        allowAutoTopicCreation: true,
                    },
                }
            },
        ])
    ],
    controllers: [ChatController],
    providers: [ChatService],
})
export class AppModule { }
