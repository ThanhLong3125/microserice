import { Module } from "@nestjs/common";
import { firebaseAdminProvider } from "./firebase-admin.provider";
import { FcmService } from "./fcm.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ['.env'],
        }),
        
    ],
    controllers: [],
    providers: [FcmService, firebaseAdminProvider],
    exports: [FcmService, firebaseAdminProvider]
})
export class FcmModule { }