import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany } from 'typeorm';
import { Gender } from 'src/enums/gender';
import { Role } from 'src/enums/role';
import { Consultation } from 'src/consultation/entities/consultation.entity';
import { Message } from 'src/message/entities/message.entity';

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 50, unique: true })
    email: string;

    @Column("varchar", { length: 150, select: false })
    password: string;

    @Column("varchar", { length: 50, nullable: true })
    name: string;

    @Column("varchar", { length: 50, nullable: true })
    lastName: string;

    @Column("date", { nullable: true })
    birthDate?: Date;

    @Column({
        type: "enum",
        enum: Gender,
        nullable: true,
    })
    gender?: Gender;

    @Column({
        type: "enum",
        enum: Role,
        default: Role.Patient,
    })
    role: Role;

    @CreateDateColumn()
    createdAt: Date;

    @OneToMany(() => Consultation, (consulta) => consulta.patient, { nullable: true })
    consultasAsPatient: Consultation[];

    @OneToMany(() => Consultation, (consulta) => consulta.doctor, { nullable: true })
    consultasAsDoctor: Consultation[];

    @OneToMany(() => Message, (message) => message.sender, { nullable: true })
    sentMessages: Message[];

    @OneToMany(() => Message, (message) => message.receiver, { nullable: true })
    receivedMessages: Message[];
}