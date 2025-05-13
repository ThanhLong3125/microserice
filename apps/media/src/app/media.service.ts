import { Inject, Injectable, Logger } from '@nestjs/common';
import { Express } from 'express';
import * as fs from 'fs';
import * as path from 'path';
import { Multer } from 'multer';
import { ClientKafka } from '@nestjs/microservices';
import { SendMessageDto } from '@socketfcm/common';

@Injectable()
export class MediaService {
  private readonly logger = new Logger();
  private readonly allowedTypes = ['image/jpeg', 'image/png'];
  private readonly maxsize = 1024 * 1024;
  constructor(@Inject('MEDIA_SERVER_KAFKA') private readonly clientKafka: ClientKafka) { }

  async checkfilevalidate(file: Express.Multer.File) {
    if (!this.allowedTypes.includes(file.mimetype)) {
      this.logger.warn('File not Valid');
      return false
    }
    if (file.size > this.maxsize) {
      this.logger.warn('File so large');
      return false
    }
    return true;
  }

  async checkvalidate(payload: SendMessageDto) {
    try {
      console.log(payload)
      if (payload.file) {
        const bool = await this.checkfilevalidate(payload.file)
        if (!bool) {
          payload.message = 'InvalidFIle'
        }
        this.clientKafka.emit('checked', { payload, valid: bool })
      }
    } catch (err) {
      this.logger.debug("Tiến hành cơ chế bù đắp")
      this.clientKafka.emit("Check_failed", {
        ID: payload.Idreceive,
        message: "Báo lỗi không check file được cho người dùng"
      })
    }
  }
}
