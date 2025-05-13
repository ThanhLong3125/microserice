import { NestFactory } from '@nestjs/core';
import { MediaModule } from './app/media.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(MediaModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'media-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'media-consumer',
        allowAutoTopicCreation: true,
      },
    },
  });
  await app.listen();
}
bootstrap();
