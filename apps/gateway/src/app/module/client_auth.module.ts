import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ClientAuthController } from "../controller/client_auth.controller";
import { ClientAuthService } from "../service/client_auth.service";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: 'AUTH_KAFKA',
                transport: Transport.KAFKA,
                options: {
                    client: {
                        clientId: 'auth',
                        brokers: ['localhost:9092']
                    },
                    consumer: {
                        groupId: 'auth-cosumer'
                    },
                    producer: {
                        allowAutoTopicCreation: true,
                    },
                }
            }
        ])
    ],
    controllers: [ClientAuthController],
    providers: [ClientAuthService],
})
export class client_authModule { }