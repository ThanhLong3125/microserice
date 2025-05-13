import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/chat.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'chat-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'chat-consumer',
        allowAutoTopicCreation: true,
      },
    },
  });
  await app.listen();
}
bootstrap();
