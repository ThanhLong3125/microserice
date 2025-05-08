import { Module } from "@nestjs/common";
import { Client, ClientsModule, Transport } from "@nestjs/microservices";
import { client_authController } from "../controller/client_auth.controller";
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
                    producer: {
                        allowAutoTopicCreation: true,
                    },
                    producerOnlyMode: true,
                }

            }
        ])
    ],
    controllers: [client_authController],
    providers: [ClientAuthService],
})
export class client_authModule { }