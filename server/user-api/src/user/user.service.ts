import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { CreateUserDto } from 'src/user/dto/create_user.dto';
import { UpdateUserDto } from 'src/user/dto/update_user.dto';
import { Auth } from 'src/constants/constants';

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repository: Repository<User>) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const hashedPassword = await bcrypt.hash(createUserDto.Password, Auth.PASSWORD_SALT);
        const newUser = this.repository.create({
            userName: createUserDto.UserName,
            lastName: createUserDto.LastName,
            name: createUserDto.Name,
            email: createUserDto.Email,
            password: hashedPassword,
        });
        return this.repository.save(newUser);
    }

    async findById(id: number): Promise<User> {
        const user = await this.repository.findOne({ where: { id } });
        return user;
    }

    async findByUserName(userName: string): Promise<User> {
        const user = await this.repository.findOne({ where: { userName } });
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email } });
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);
        user.userName = updateUserDto.UserName || user.userName;
        user.lastName = updateUserDto.LastName || user.lastName;
        user.name = updateUserDto.Name || user.name;
        user.email = updateUserDto.Email || user.email;

        if (updateUserDto.Password) {
            user.password = await bcrypt.hash(updateUserDto.Password, Auth.PASSWORD_SALT);
        }

        return this.repository.save(user);
    }

    async changePassword(id: number, newPassword: string): Promise<User> {
        const user = await this.findById(id);
        user.password = await bcrypt.hash(newPassword, Auth.PASSWORD_SALT);
        return this.repository.save(user);
    }

    async delete(id: number): Promise<void> {
        const user = await this.findById(id);
        await this.repository.remove(user);
    }

    async selectWithPassword(userName: string): Promise<User> {
        return await this.repository.findOne({
            where: { userName },
            select: ['id', 'userName', 'password'],
        });
    }
}
