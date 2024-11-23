import { IsString, IsOptional, IsEnum, IsDate, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Gender } from 'src/enums/gender';
import { Role } from 'src/enums/role';

export class UpdateUserDto {
    @ApiProperty({ example: 'correo@correo.es', description: 'Correo electrónico del usuario' })
    @IsString({ message: 'El correo electrónico debe ser una cadena de texto.' })
    @IsOptional()
    Email?: string;

    @ApiProperty({ example: 'password123', description: 'Contraseña' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto.' })
    @IsOptional()
    Password?: string;

    @ApiProperty({ example: 'Juan', description: 'Nombre del usuario' })
    @IsString({ message: 'El nombre debe ser una cadena de texto.' })
    @IsOptional()
    Name?: string;

    @ApiProperty({ example: 'Pérez', description: 'Apellido del usuario' })
    @IsString({ message: 'El apellido debe ser una cadena de texto.' })
    @IsOptional()
    LastName?: string;

    @ApiProperty({ example: '1990-01-01', description: 'Fecha de nacimiento del usuario', required: false })
    @IsDateString({}, { message: 'La fecha de nacimiento debe estar en formato ISO 8601 (YYYY-MM-DD).' })
    @IsOptional()
    BirthDate?: Date;

    @ApiProperty({ example: Gender.Male, description: 'Género del usuario', enum: Gender, required: false })
    @IsEnum(Gender, { message: 'El género debe ser Masculino, Femenino u Otro.' })
    @IsOptional()
    Gender?: Gender;

    @ApiProperty({ example: Role.Patient, description: 'Rol del usuario', enum: Role, required: false })
    @IsEnum(Role, { message: 'El rol debe ser Paciente, Medico o Administrador.' })
    @IsOptional()
    Role?: Role;
}