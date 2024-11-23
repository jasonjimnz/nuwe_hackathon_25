import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
    @ApiProperty({ example: 'john_doe', description: 'Nombre de usuario' })
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El nombre de usuario debe tener entre 3 y 50 caracteres.' })
    UserName: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Length(6, 50, { message: 'La contraseña debe tener entre 6 y 50 caracteres.' })
    Password: string;
}