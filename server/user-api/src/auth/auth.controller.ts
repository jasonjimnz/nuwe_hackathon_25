import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/constants/constants';
import { AuthService } from 'src/auth/auth.service';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UserService } from 'src/user/user.service';

@ApiTags("Auth")
@Controller("api/auth")
export class AuthController {
  constructor(private readonly authService: AuthService, private readonly userService: UserService) { }

  @Public()
  @Post('sign-in')
  async auth(@Body() authDto: AuthDto) {
    return await this.authService.verifyUser(authDto);
  }

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @Post('sign-up')
  @Public()
  async create(@Body() userDto: CreateUserDto) {
    const alreadyExistEmail = await this.userService.findByEmail(userDto.Email);

    if (alreadyExistEmail) {
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }

    const user = await this.userService.create(userDto);
    user.password = "";
    return user;
  }
}
