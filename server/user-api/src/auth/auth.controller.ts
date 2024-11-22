import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants/constants';
import { AuthService } from 'src/auth/auth.service';

@ApiTags("api/auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Public()
  @Post('sign-in')
  async auth(@Body() authDto: AuthDto) {
    return await this.authService.verifyUser(authDto);
  }
}
