import { Controller, Get, Post, Put, Delete, Body, Param, NotFoundException, BadRequestException, Req } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/constants/constants';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';

@ApiTags("user")
@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiBody({ type: CreateUserDto })
  @Post('sign-up')
  @Public()
  async create(@Body() userDto: CreateUserDto) {
    const alreadyExistEmail = await this.userService.findByEmail(userDto.Email);
    const alreadyExistUserName = await this.userService.findByUserName(userDto.UserName);

    if (alreadyExistEmail) {
      throw new BadRequestException('El correo electrónico ya está en uso.');
    }

    if (alreadyExistUserName) {
      throw new BadRequestException('El nombre de usuario ya está en uso.');
    }

    const user = await this.userService.create(userDto);
    user.password = "";
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por correo electrónico' })
  @ApiParam({ name: 'email', description: 'Correo electrónico del usuario', example: 'correo@correo.es' })
  @Get('email/:email')
  async getUserByEmail(@Param('email') email: string) {
    const user = await this.userService.findByEmail(email);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado con ese correo electrónico.');
    }
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por nombre de usuario' })
  @ApiParam({ name: 'username', description: 'Nombre de usuario', example: 'usuario123' })
  @Get('username/:username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.userService.findByUserName(username);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado con ese nombre de usuario.');
    }
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por ID with token' })
  @Get("getUserDetail")
  async getUserDetail(@Req() req) {
    const user = await this.userService.findById(req.user.id);
    if (!user) {
      throw new NotFoundException(`Usuario no encontrado con ese ID ${req.user.id}.`);
    }
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por ID' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: '1' })
  @Get('id/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado con ese ID.');
    }
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: '1' })
  @ApiBody({ type: UpdateUserDto })
  @Put('update/:id')
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado con ese ID.');
    }
    return this.userService.update(id, updateUserDto);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: '1' })
  @Delete('delete/:id')
  async delete(@Param('id') id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('Usuario no encontrado con ese ID.');
    }
    await this.userService.delete(id);
    return { message: 'Usuario eliminado correctamente.' };
  }
}