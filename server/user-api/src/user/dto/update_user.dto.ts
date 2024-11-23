import { IsString, Length, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
    @ApiProperty({ example: 'john_doe', description: 'Nombre de usuario' })
    @IsString({ message: 'El nombre de usuario debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El nombre de usuario debe tener entre 3 y 50 caracteres.' })
    @IsOptional()
    UserName?: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Length(6, 50, { message: 'La contraseña debe tener entre 6 y 50 caracteres.' })
    @IsOptional()
    Password?: string;

    @ApiProperty({ example: 'correo@correo.es', description: 'Correo electrónico del usuario' })
    @IsString({ message: 'El correo electrónico debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El correo electrónico debe tener entre 3 y 50 caracteres.' })
    @IsOptional()
    Email?: string;

    @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El nombre debe tener entre 3 y 50 caracteres.' })
    @IsOptional()
    Name?: string;

    @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
    @IsString({ message: 'El apellido debe ser una cadena de texto.' })
    @Length(3, 50, { message: 'El apellido debe tener entre 3 y 50 caracteres.' })
    @IsOptional()
    LastName?: string;
}
