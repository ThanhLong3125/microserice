import { NestFactory } from '@nestjs/core';
import { AuthModule } from './app/auth.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AuthModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'auth-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'auth-consumer',
        allowAutoTopicCreation: true,
      },
    },
  });
  await app.listen();
}
bootstrap();
