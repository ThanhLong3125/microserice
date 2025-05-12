import { Controller, Logger } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';
import { RegisterDto } from '@socketfcm/common';

@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name)
  constructor(
    private readonly userService: UserService,
  ) { }

  @GrpcMethod('UserService', 'checkEmailexists')
  async checkEmailExists(data: { email: string }) {
    try {
      this.logger.log('Received from gRPC:', data);
      const exists = await this.userService.checkEmailExists(data.email);
      return { exists };
    } catch (error) {
      this.logger.error(error);
    }
  }


  @GrpcMethod('UserService', 'createUser')
  async createUser(user: RegisterDto) {
    try {
      const result = await this.userService.createUser(user);
      return result;
    } catch (err) {
      this.logger.error(err);
    }
  }

  @GrpcMethod('UserService', 'getProfile')
  async getProfile(data: { id: string }) {
    try {
      return this.userService.getProfile(data.id)
    } catch (err) {
      this.logger.error(err);
    }
  }
}
