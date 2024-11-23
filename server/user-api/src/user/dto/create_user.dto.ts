import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
    @ApiProperty({ example: 'correo@correo.es', description: 'Correo electrónico del usuario' })
    @IsString({ message: 'El correo electrónico debe ser una cadena de texto.' })
    @IsOptional()
    Email: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @IsOptional()
    Password: string;
}
