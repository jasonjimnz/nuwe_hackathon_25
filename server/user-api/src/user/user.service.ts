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
        const newUser: User = new User();
        newUser.email = createUserDto.Email;
        newUser.password = hashedPassword;

        return this.repository.save(newUser);
    }

    async findById(id: number): Promise<User> {
        const user = await this.repository.findOne({ where: { id } });
        return user;
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email } });
        return user;
    }

    async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.findById(id);
        user.lastName = updateUserDto.LastName || user.lastName;
        user.name = updateUserDto.Name || user.name;
        user.email = updateUserDto.Email || user.email;
        user.role = updateUserDto.Role || user.role;
        user.birthDate = updateUserDto.BirthDate || user.birthDate;
        user.gender = updateUserDto.Gender || user.gender;

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

    async selectWithPassword(email: string): Promise<User> {
        return await this.repository.findOne({
            where: { email },
            select: ['id', 'email', 'password'],
        });
    }
}
