import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.port ?? 3000;
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Gateway API')
    .setDescription('The gateway API description')
    .setVersion('1.0')
    .addTag('Auth')
    .addTag('Notification')
    .build();
  const DocumentFactory = () => SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, DocumentFactory);
  await app.listen(port);
  console.log(`Swagger is running on: http://localhost:${process.env.port}/api`);
}
bootstrap();
