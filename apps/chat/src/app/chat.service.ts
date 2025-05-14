import { Inject, Injectable, Logger } from '@nestjs/common';
import { CommandBus, EventBus } from '@nestjs/cqrs';
import { ClientKafka } from '@nestjs/microservices';
import { SendMessageDto } from '@socketfcm/common';
import { Express } from 'express';
import { Multer } from 'multer'
import { SocketService } from '@socketfcm/core'

@Injectable()
export class ChatService {
    private readonly logger = new Logger(ChatService.name)
    constructor(
        private readonly socketService: SocketService,
        @Inject('CHAT_SERVER_KAFKA') private readonly clientKafka: ClientKafka
    ) { }
    async Chat1v1(IdUserSend: string, IdUserReceive: string, message: string, file: Express.Multer.File) {
        const payload: SendMessageDto = {
            IdSend: IdUserSend,
            Idreceive: IdUserReceive,
            message: message,
            file: file,
        };

        try {
            this.clientKafka.emit('checkFile', payload)
        } catch (err) {
            this.logger.error(`Không gửi được sự kiện checkFile: ${err.message}`);
            this.clientKafka.emit('chat_failed', { id: IdUserReceive, message: 'khong the gui tin nhan' });
        }
    }

}
