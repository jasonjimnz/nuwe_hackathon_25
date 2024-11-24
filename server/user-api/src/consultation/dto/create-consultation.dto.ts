import { IsNotEmpty, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateConsultationDto {
    @ApiProperty({ description: 'ID of the patient user', type: Number })
    @IsNotEmpty()
    patientId: number;

    @ApiProperty({ description: 'ID of the doctor user', type: Number })
    @IsNotEmpty()
    doctorId: number;

    @ApiProperty({ example: '1990-01-01', description: 'Consultation date', required: true })
    @IsDateString({}, { message: 'La fecha de nacimiento debe estar en formato ISO 8601 (YYYY-MM-DD).' })
    @IsNotEmpty()
    date: Date;
}