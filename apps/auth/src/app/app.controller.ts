import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from '@socketfcm/common';

@Controller()
export class AuthController {
  constructor(private readonly AuthService: AuthService) { }


  @EventPattern('register')
  async handleTopic(@Payload() data: RegisterDto) {
    try {
      await this.AuthService.regiserUser(data);
      return 'OK'
    } catch (error) {
      throw new Error(error)
    }
  }
}
