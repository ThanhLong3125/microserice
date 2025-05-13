import {
  Body,
  Controller,
  Inject,
  Logger,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SendMessageDto } from '@socketfcm/common';
import { Express } from 'express';

@ApiTags('chat')
@Controller()
export class ClientChatController {
  private readonly logger = new Logger(ClientChatController.name);

  constructor(@Inject('CHAT_KAFKA') private readonly chatClient: ClientKafka) { }

  @Post('sendchat')
  @UseInterceptors(
    FileInterceptor('file'),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        senderId: { type: 'string', example: 'user123' },
        receiverId: { type: 'string', example: 'user456' },
        message: { type: 'string', example: 'Hello there' },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: ['senderId', 'receiverId'],
    },
  })
  async ChatMessage(
    @Body('senderId') senderId: string,
    @Body('receiverId') receiverId: string,
    @Body('message') message: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const payload: SendMessageDto = {
      IdSend: senderId,
      Idreceive: receiverId,
      message: message,
      file: file,
    };

    this.chatClient.emit('send-message', payload);
    return { status: 'Sending' };
  }
}
