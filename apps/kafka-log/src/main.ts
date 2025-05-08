import { NestFactory } from '@nestjs/core';
import { ConsumerLogsModule } from './app/consumer-logs.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(ConsumerLogsModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'consumer-logs-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'consumer-logs-consumer',
        allowAutoTopicCreation: true,
      },
    },
  });
  await app.listen();
}
bootstrap();
