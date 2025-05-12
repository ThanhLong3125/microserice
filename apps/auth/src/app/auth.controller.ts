import { Controller, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { RegisterDto } from '@socketfcm/common';

@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name)
  constructor(private readonly AuthService: AuthService) { }


  @MessagePattern('register')
  async handleTopic(@Payload() data: RegisterDto) {
    try {
      return await this.AuthService.regiserUser(data);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @MessagePattern('getProfile')
  async getProfile(@Payload() data: string) {
    try {
      const reply = await this.AuthService.getProfile(data);
      return reply;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
