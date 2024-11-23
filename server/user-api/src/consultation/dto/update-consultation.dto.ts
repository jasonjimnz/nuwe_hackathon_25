import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsDateString } from "class-validator";

export class UpdateConsultationDto {
    @ApiProperty({ description: 'ID of the consultation', type: Number })
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: 'ID of the patient user', type: Number })
    @IsOptional()
    patientId?: number;

    @ApiProperty({ description: 'ID of the doctor user', type: Number })
    @IsOptional()
    doctorId?: number;

    @ApiProperty({ example: '1990-01-01', description: 'Consultation date', required: false })
    @IsDateString({}, { message: 'La fecha de nacimiento debe estar en formato ISO 8601 (YYYY-MM-DD).' })
    @IsNotEmpty()
    date?: Date;

    @ApiProperty({ description: 'Whether the consultation is completed', type: Boolean })
    @IsOptional()
    isCompleted?: boolean;
}