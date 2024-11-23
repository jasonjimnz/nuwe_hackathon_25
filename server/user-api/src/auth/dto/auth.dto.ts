import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
    @ApiProperty({ example: 'correo@correo.es', description: 'Correo electrónico del usuario' })
    @IsString({ message: 'El correo electrónico debe ser una cadena de texto.' })
    Email: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @Length(6, 50, { message: 'La contraseña debe tener entre 6 y 50 caracteres.' })
    Password: string;
}
