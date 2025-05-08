import { IsString } from "class-validator";

export class CreateNotificationDto {
  @IsString()
  id: string;

  @IsString()
  message: string;
}