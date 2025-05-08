import { Module } from '@nestjs/common';
import { AuthController } from './app.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    ClientsModule.register([
      {
        name: 'user_package',
        transport: Transport.GRPC,
        options: {
          package: 'user',
          protoPath: join(process.cwd(), 'libs/common/src/lib/proto/user.proto'),
          url: 'localhost:50053',
        }
      }
    ])
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }
