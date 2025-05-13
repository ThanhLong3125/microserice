import { IsString } from "class-validator";
import { Express } from 'express';
import { Multer } from 'multer';
export class SendMessageDto {
    @IsString()
    IdSend: string

    @IsString()
    Idreceive: string

    @IsString()
    message: string

    file: Express.Multer.File
}