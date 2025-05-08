import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientNotificationModule } from './module/client_notification.module';
import { client_authModule } from './module/client_auth.module';
import { ClientNotificationController } from './controller/client_notification.controller';

@Module({
  imports: [
    client_authModule,
    ClientNotificationModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
