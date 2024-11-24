import { Controller, Get, Put, Post, Delete, Body, Param, BadRequestException, NotFoundException } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { UpdateMessageDto } from 'src/message/dto/update-message.dto';
import { ApiTags, ApiOperation, ApiBody, ApiParam, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('Message')
@ApiBearerAuth()
@Controller('api/messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiBody({ type: CreateMessageDto })
  async create(@Body() createMessageDto: CreateMessageDto) {
    return this.messageService.create(createMessageDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing message' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: UpdateMessageDto })
  async update(@Param('id') id: number, @Body() updateMessageDto: UpdateMessageDto) {
    return this.messageService.update(id, updateMessageDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a message by ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: number) {
    return this.messageService.findOne(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a message by ID' })
  @ApiParam({ name: 'id', type: Number })
  async remove(@Param('id') id: number) {
    return this.messageService.remove(id);
  }

  @Get('sent/:senderId')
  @ApiOperation({ summary: 'Get all messages sent by a user' })
  @ApiParam({ name: 'senderId', type: Number })
  async getMessagesBySender(@Param('senderId') senderId: number) {
    try {
      return await this.messageService.getMessagesBySender(senderId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Error retrieving sent messages');
    }
  }

  @Get('received/:receiverId')
  @ApiOperation({ summary: 'Get all messages received by a user' })
  @ApiParam({ name: 'receiverId', type: Number })
  async getMessagesByReceiver(@Param('receiverId') receiverId: number) {
    try {
      return await this.messageService.getMessagesByReceiver(receiverId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Error retrieving received messages');
    }
  }

  @Get('consultation/:consultationId')
  @ApiOperation({ summary: 'Get all messages from a consultation' })
  @ApiParam({ name: 'consultationId', type: Number })
  async getMessagesByConsultation(@Param('consultationId') consultationId: number) {
    try {
      return await this.messageService.getMessagesByConsultation(consultationId);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException('Error retrieving messages for consultation');
    }
  }
}