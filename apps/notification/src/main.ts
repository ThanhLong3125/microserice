import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './app/notification.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(NotificationModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification-service',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'notification-consumer',
        allowAutoTopicCreation: true,
      },
    }
  });
  await kafkaApp.listen();
  console.log('Notification microservices are running');
}
bootstrap();
