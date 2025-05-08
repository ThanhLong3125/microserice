import { Body, Controller, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ClientAuthService } from "../service/client_auth.service";
import { RegisterDto } from "@socketfcm/common";

@ApiTags('Auth')
@Controller('auth')
export class client_authController {
  constructor(private readonly authservice: ClientAuthService) { }

  @Post('register')
  @ApiOperation({ summary: 'register' })
  async Register(@Body() register: RegisterDto) {
    try {
      return this.authservice.register(register);
    } catch (error) {
      throw new Error(error);
    }
  }

}