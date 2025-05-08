import { Controller } from '@nestjs/common';
import { UserService } from './user.service';
import { GrpcMethod } from '@nestjs/microservices';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) { }

  @GrpcMethod('UserService', 'checkEmailexists')
  async checkEmailExists(data: { email: string }): Promise<{ exists: boolean }> {
    try {
      console.log('Received from gRPC:', data);
      const exists = await this.userService.checkEmailExists(data.email);
      return { exists };
    } catch (error) {
      throw new Error(`Error checking email: ${error.message}`);
    }
  }
  

  @GrpcMethod('UserService', 'createUser')
  async createUser(user: any): Promise<any> {
    try {
      const newUser = await this.userService.createUser(user);
      return newUser;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  }
}
