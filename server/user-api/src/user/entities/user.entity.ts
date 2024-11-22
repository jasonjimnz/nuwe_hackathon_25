import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, OneToMany, JoinTable, CreateDateColumn } from 'typeorm';

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("varchar", { length: 50, unique: true })
    userName: string;

    @Column("varchar", { length: 50, unique: true })
    email: string;

    @Column("varchar", { length: 150, select: false })
    password: string;

    @Column("varchar", { length: 50 })
    name: string;

    @Column("varchar", { length: 50 })
    lastName: string;

    @CreateDateColumn()
    createdAt: Date;
}