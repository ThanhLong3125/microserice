import { Body, Controller, Get, Logger, Post, Query } from "@nestjs/common";
import { ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClientAuthService } from "../service/client_auth.service";
import { RegisterDto } from "@socketfcm/common";

@ApiTags('Auth')
@Controller('auth')
export class ClientAuthController {
  private readonly logger = new Logger(ClientAuthController.name)
  constructor(private readonly authservice: ClientAuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'register' })
  async Register(@Body() register: RegisterDto) {
    try {
      return this.authservice.register(register);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @Get('Profile')
  @ApiOperation({ summary: 'GetProfile' })
  async getProfile(@Query('id') id: string) {
    try {
      const result = this.authservice.getProfile(id);
      return result;
    } catch (error) {
      this.logger.error(error);
    }
  }
}