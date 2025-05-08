import { IsObject, IsString } from "class-validator";

export class NotificationDto {

  @IsString()
  id: string;

  @IsObject()
  message: object;

  constructor(id: string, message: object) {
    this.id = id;
    this.message = message;
  }
}