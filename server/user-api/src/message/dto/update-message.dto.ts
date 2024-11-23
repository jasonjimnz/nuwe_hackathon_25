import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateMessageDto {
    @ApiProperty({ description: 'ID of the message', type: Number })
    @IsNotEmpty()
    id: number;

    @ApiProperty({ description: 'Content of the message' })
    @IsOptional()
    @IsString()
    content?: string;

    @ApiProperty({ description: 'ID of the sender user', type: Number })
    @IsOptional()
    senderId?: number;

    @ApiProperty({ description: 'ID of the receiver user', type: Number })
    @IsOptional()
    receiverId?: number;

    @ApiProperty({ description: 'ID of the consultation associated with the message', type: Number })
    @IsOptional()
    consultationId?: number;
}