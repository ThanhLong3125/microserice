import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { RegisterDto } from "@socketfcm/common";

@Injectable()
export class ClientAuthService implements OnModuleInit{
    constructor(@Inject('AUTH_KAFKA') private readonly auth_client: ClientKafka) { }

    async onModuleInit() {
        await this.auth_client.connect();
        console.log('OK')
    }

    async register(payload: RegisterDto): Promise<void> {
        try {
            this.auth_client.emit('register', payload);
            console.log('Register event sent successfully');
        } catch (error) {
            console.error('Error while emitting register event:', error);
            throw error;
        }
    }
}
