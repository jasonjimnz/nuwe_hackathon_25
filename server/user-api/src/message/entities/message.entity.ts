import { Consultation } from 'src/consultation/entities/consultation.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Message' })
export class Message {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    content: string;

    @CreateDateColumn()
    timestamp: Date;

    @ManyToOne(() => User, (user) => user.sentMessages)
    sender: User;

    @ManyToOne(() => User, (user) => user.receivedMessages)
    receiver: User;

    @ManyToOne(() => Consultation, (consultation) => consultation.messages)
    consultation: Consultation;
}
