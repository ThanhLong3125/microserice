import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.chema';
import { RegisterDto } from '@socketfcm/common'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(@InjectModel(User.name) private readonly UserModel: Model<UserDocument>) { }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      this.logger.log(`Checking if email ${email} exists`);
      const user = await this.UserModel.find({email}).exec();
      if (user) {
        this.logger.log(`Email ${email} exists`);
        return false;
      }
      return true;
    } catch (error) {
      this.logger.error(`Error checking email ${email}: ${error.message}`);
      return false
    }
  }

  async createUser(user: User): Promise<any> {
    try {
      this.logger.log(`Creating user ${user.email}`);
      const User: RegisterDto = {
        email: user.email,
        password: user.password,
        name: user.name,
        role: 'user',
      }
      const newUser = new this.UserModel(User);
      await newUser.save();
      this.logger.log(`User ${user.email} created`);
      const { password, ...result } = newUser;
      return `${result.name} is created`;
    } catch (error) {
      this.logger.error(`Error creating user ${user.email}: ${error.message}`);
      
    }
  }
}
