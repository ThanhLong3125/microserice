import { Inject, Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { ClientKafka } from "@nestjs/microservices";
import { RegisterDto } from "@socketfcm/common";
import { firstValueFrom } from "rxjs";

@Injectable()
export class ClientAuthService implements OnModuleInit {
    private readonly logger = new Logger(ClientAuthService.name)
    constructor(@Inject('AUTH_KAFKA') private readonly auth_client: ClientKafka) { }

    async onModuleInit() {
        this.auth_client.subscribeToResponseOf('getProfile');
        this.auth_client.subscribeToResponseOf('register');
        await this.auth_client.connect();
        this.logger.log('Kafka client connected');

    }
    async register(payload: RegisterDto): Promise<void> {
        try {
            const result = await firstValueFrom(this.auth_client.send('register', payload));
            this.logger.log('Register event sent successfully');
            return result;
        } catch (error) {
            this.logger.error('Error while emitting register event:', error);
        }
    }

    async getProfile(id: string) {
        try {
            const result = await firstValueFrom(this.auth_client.send('getProfile', id));
            //const result = this.auth_client.emit('getProfile', id)
            return result;
        } catch (err) {
            this.logger.error(err)
        }
    }
}
