import { Body, Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { MediaService } from './media.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { Multer } from 'multer';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendMessageDto } from '@socketfcm/common';

@ApiTags('test')
@Controller()
export class MediaController {
  constructor(private readonly appService: MediaService) { }

  @EventPattern('checkFile')
  async check(@Payload() payload: SendMessageDto) {
    await this.appService.checkvalidate(payload)
  }
}
