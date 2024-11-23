import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsOptional } from "class-validator";

export class CreateMessageDto {
    @ApiProperty({ description: 'Content of the message' })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ description: 'ID of the sender user', type: Number })
    @IsNotEmpty()
    senderId: number;

    @ApiProperty({ description: 'ID of the receiver user', type: Number })
    @IsNotEmpty()
    receiverId: number;

    @ApiProperty({ description: 'ID of the consultation associated with the message', type: Number })
    @IsOptional()
    consultationId?: number;
}