import { Module } from "@nestjs/common";
import { SocketService } from "./socket.service";
import { FcmModule } from "../firebase/fcm.module";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        //FcmModule,
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env']
        })
    ],
    controllers: [],
    providers: [SocketService],
    exports: [SocketService]
})
export class SocketModule { }