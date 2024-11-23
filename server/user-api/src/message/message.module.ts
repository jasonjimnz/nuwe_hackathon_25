import { Module } from '@nestjs/common';
import { MessageService } from 'src/message/message.service';
import { MessageController } from 'src/message/message.controller';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Message } from 'src/message/entities/message.entity';
import { UserModule } from 'src/user/user.module';
import { ConsultationModule } from 'src/consultation/consultation.module';

@Module({
  imports: [
    UserModule,
    ConsultationModule,
    TypeOrmModule.forFeature([Message]),
  ],
  controllers: [MessageController],
  providers: [MessageService],
})
export class MessageModule { }
