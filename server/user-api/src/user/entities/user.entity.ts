import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Gender } from 'src/enums/gender';
import { Role } from 'src/enums/role';

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
}