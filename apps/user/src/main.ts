
import { NestFactory } from '@nestjs/core';
import { UserModule } from './app/user.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(UserModule, {
    transport: Transport.GRPC,
    options: {
      package: 'user',
      protoPath: join(process.cwd(), 'libs/common/src/lib/proto/user.proto'),
      url: 'localhost:50053',
    }
  });
  await app.listen();
}

bootstrap();
