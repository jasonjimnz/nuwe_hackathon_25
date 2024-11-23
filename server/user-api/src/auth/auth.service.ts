import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { AuthDto } from 'src/auth/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async verifyUser(authDto: AuthDto) {
        const user = await this.userService.selectWithPassword(authDto.Email);
        if (!user) {
            throw new NotFoundException(`No se encontró el usuario con el userName: ${authDto.Email}`);
        }

        const isMatch = await bcrypt.compare(authDto.Password, user.password);
        if (!isMatch) {
            throw new UnauthorizedException();
        }

        const payload = {
            sub: user.id,
            email: user.email
        };

        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
