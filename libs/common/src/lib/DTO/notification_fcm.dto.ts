import { IsObject, IsString } from "class-validator";

export class Notificationfcmdto {
    @IsString()
    title: string;

    @IsString()
    body: string;

    @IsString()
    deviceId: any;

    @IsObject()
    data: object;
}