import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto, UserDto, User, UserDocument } from '@socketfcm/common'

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>,
  ) { }

  async checkEmailExists(email: string): Promise<boolean> {
    try {
      this.logger.log(`Checking if email ${email} exists`);
      const user = await this.UserModel.find({ email }).exec();
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

  async createUser(user: RegisterDto): Promise<any> {
    try {
      const userData: RegisterDto = {
        email: user.email,
        password: user.password,
        name: user.name,
        role: user.role || 'user',
      };

      const created = new this.UserModel(userData);
      await created.save();
      return { message: 'Created' };
    } catch (error) {
      this.logger.error(`Error creating user ${user.email}: ${error.message}`);
      return { message: `Failed to create user: ${error.message}` };

    }
  }

  async getProfile(id: string): Promise<any> {
    try {
      const user = await this.UserModel.findById(id).exec();
      if (user) {
        const response: UserDto = {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        }
        this.logger.log(response)
        return response;
      }
    } catch (err) {
      this.logger.log(err);
    }
  }
}
