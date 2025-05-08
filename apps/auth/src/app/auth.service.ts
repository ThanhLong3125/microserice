import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { RegisterDto } from '@socketfcm/common';
import { UserGRPC } from '@socketfcm/common';
import { firstValueFrom, Observable, of } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserGRPC;
  private readonly logger = new Logger(AuthService.name);
  constructor(
    @Inject('user_package') private readonly client: ClientGrpc
  ) { }

  onModuleInit() {
    this.userService = this.client.getService<UserGRPC>('UserService');
  }

  async regiserUser(regiserdto: RegisterDto): Promise<string> {
    try {
      console.log(regiserdto.email)
      const res = await firstValueFrom(this.userService.checkEmailexists({ email: regiserdto.email }));
      if (res.exists) {
        return `your ${regiserdto.email} exists`;
      }
      
      console.log(regiserdto.email)
      await firstValueFrom(this.userService.createUser(regiserdto));
      return `your account ${regiserdto.email} was created`;
    } catch (error) {
      throw new Error(error);
    }
  }
}
