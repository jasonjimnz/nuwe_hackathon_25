import { Message } from 'src/message/entities/message.entity';
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Consultation' })
export class Consultation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.consultasAsPatient)
    patient: User;

    @ManyToOne(() => User, (user) => user.consultasAsDoctor)
    doctor: User;

    @Column()
    date: Date;

    @Column({ type: 'boolean', default: false })
    isCompleted: boolean;

    @OneToMany(() => Message, (message) => message.consultation)
    messages: Message[];
}
