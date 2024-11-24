import { Controller, Get, Put, Delete, Body, Param, NotFoundException, Req, BadRequestException, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { UserService } from 'src/user/user.service';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';
import { Role } from 'src/enums/role';

@ApiTags("User")
@Controller("api/user")
export class UserController {
  constructor(private readonly userService: UserService) { }

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
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() req
  ) {
    const userId = req.user.id;

    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('El ID proporcionado no es válido.');
    }

    if (id !== userId) {
      const userRequesting = await this.userService.findById(userId);

      if (!userRequesting) {
        throw new UnauthorizedException(
          'El usuario autenticado no se encuentra en el sistema.'
        );
      }

      if (userRequesting.role !== Role.Admin) {
        throw new BadRequestException(
          'Solo el propio usuario o un administrador pueden modificar estos datos.'
        );
      }
    }

    const userToUpdate = await this.userService.findById(id);
    if (!userToUpdate) {
      throw new NotFoundException(`Usuario no encontrado con el ID ${id}.`);
    }
    const user = await this.userService.update(id, updateUserDto);
    user.password = "";
    return user;
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar usuario' })
  @ApiParam({ name: 'id', description: 'ID del usuario', example: '1' })
  @Delete('delete/:id')
  async delete(@Param('id') id: number, @Req() req) {
    const userId = req.user.id;

    if (isNaN(id) || id <= 0) {
      throw new BadRequestException('El ID proporcionado no es válido.');
    }

    const userToDelete = await this.userService.findById(id);
    if (!userToDelete) {
      throw new NotFoundException(`Usuario no encontrado con el ID ${id}.`);
    }

    const userRequesting = await this.userService.findById(userId);

    if (!userRequesting) {
      throw new UnauthorizedException(
        'El usuario autenticado no se encuentra en el sistema.'
      );
    }

    if (id !== userId && userRequesting.role !== Role.Admin) {
      throw new ForbiddenException(
        'Solo el propio usuario o un administrador pueden eliminar este usuario.'
      );
    }

    await this.userService.delete(id);
    return { message: 'Usuario eliminado correctamente.' };
  }
  
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener lista de pacientes' })
  @Get('patients')
  async getPatients() {
    return this.userService.getListPatient();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener lista de doctores' })
  @Get('doctors')
  async getDoctors() {
    return this.userService.getListDoctor();
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener lista de administradores' })
  @Get('admins')
  async getAdmins() {
    return this.userService.getListAdmin();
  }
}
