import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { ClientNotificationModule } from './module/client_notification.module';
import { client_authModule } from './module/client_auth.module';
import { MediaModule} from '../../../media/src/app/media.module'
import { CLientChatModule } from './module/client_chat.module';

@Module({
  imports: [
    CLientChatModule,
    //MediaModule,
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
