import { Module } from '@nestjs/common';
import { MediaController } from './media.controller';
import { MediaService } from './media.service';
import { CqrsModule } from '@nestjs/cqrs';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
    imports: [
        CqrsModule,
        ClientsModule.register([
            {
                name: 'MEDIA_SERVER_KAFKA',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'media_serve',
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
    controllers: [MediaController],
    providers: [MediaService],
})
export class MediaModule { }
