import { Controller, Get } from '@nestjs/common';
import { ChatService } from './chat.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices'
import { SendMessageDto } from '@socketfcm/common';

@Controller()
export class ChatController {
  constructor(private readonly appService: ChatService) { }

  @MessagePattern('send-message')
  async send(@Payload() payload: SendMessageDto) {
    console.log(payload)
    const { IdSend, Idreceive, message, file } = payload
    return await this.appService.Chat1v1(IdSend, Idreceive, message, file)
  }
}
