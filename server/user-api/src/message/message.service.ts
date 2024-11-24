import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Message } from 'src/message/entities/message.entity';
import { CreateMessageDto } from 'src/message/dto/create-message.dto';
import { UpdateMessageDto } from 'src/message/dto/update-message.dto';
import { UserService } from 'src/user/user.service';
import { ConsultationService } from 'src/consultation/consultation.service';

@Injectable()
export class MessageService {
  constructor(
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    private readonly userService: UserService,
    private readonly consultationService: ConsultationService
  ) { }

  async create(createMessageDto: CreateMessageDto): Promise<Message> {
    const { content, senderId, receiverId, consultationId } = createMessageDto;

    const sender = await this.userService.findById(senderId);
    if (!sender) {
      throw new NotFoundException('Sender user not found');
    }

    const receiver = await this.userService.findById(receiverId);
    if (!receiver) {
      throw new NotFoundException('Receiver user not found');
    }

    const consultation = await this.consultationService.findOne(consultationId);
    if (!consultation) {
      throw new NotFoundException('Consultation not found');
    }

    const newMessage = this.messageRepository.create({
      content,
      sender,
      receiver,
      consultation,
    });

    try {
      return await this.messageRepository.save(newMessage);
    } catch (error) {
      throw new BadRequestException('Error creating message', error.message);
    }
  }

  async update(id: number, updateMessageDto: UpdateMessageDto): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    Object.assign(message, updateMessageDto);
    try {
      return await this.messageRepository.save(message);
    } catch (error) {
      throw new BadRequestException('Error updating message');
    }
  }

  async findOne(id: number): Promise<Message> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    return message;
  }

  async remove(id: number): Promise<void> {
    const message = await this.messageRepository.findOne({ where: { id } });
    if (!message) {
      throw new NotFoundException('Message not found');
    }
    await this.messageRepository.remove(message);
  }

  async getMessagesBySender(senderId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { sender: { id: senderId } },
      relations: ['receiver', 'consultation'],
    });

    if (!messages || messages.length === 0) {
      throw new NotFoundException('No messages found for this sender');
    }

    return messages;
  }

  async getMessagesByReceiver(receiverId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { receiver: { id: receiverId } },
      relations: ['sender', 'consultation'],
    });

    if (!messages || messages.length === 0) {
      throw new NotFoundException('No messages found for this receiver');
    }

    return messages;
  }

  async getMessagesByConsultation(consultationId: number): Promise<Message[]> {
    const messages = await this.messageRepository.find({
      where: { consultation: { id: consultationId } },
      relations: ['sender', 'receiver'],
    });

    if (!messages || messages.length === 0) {
      throw new NotFoundException('No messages found for this consultation');
    }

    return messages;
  }
}