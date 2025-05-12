import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, ClientKafka } from '@nestjs/microservices';
import { RegisterDto } from '@socketfcm/common';
import { UserGRPC } from '@socketfcm/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserGRPC;
  private readonly logger = new Logger(AuthService.name);
  constructor(@Inject('user_package') private readonly client: ClientGrpc) { }

  onModuleInit() {
    this.userService = this.client.getService<UserGRPC>('UserService');
  }

  async regiserUser(regiserdto: RegisterDto): Promise<string> {
    try {
      const res = await firstValueFrom(this.userService.checkEmailexists({ email: regiserdto.email }));
      if (res.exists) {
        return `your ${regiserdto.email} exists`;
      }
      const result = await firstValueFrom(this.userService.createUser(regiserdto));
      this.logger.log(result)
      return result;
    } catch (error) {
      this.logger.error(error);
      return `${error}`
    }
  }

  async getProfile(id: string) {
    try {
      return await firstValueFrom(this.userService.getProfile({ id: id }))
    } catch (err) {
      this.logger.error(err)
    }
  }
}
