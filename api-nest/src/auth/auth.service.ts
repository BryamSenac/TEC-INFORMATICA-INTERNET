import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from './model/user.interface';
import { jwtConstants } from './auth.module';
import { Users } from './model/user.br';

@Injectable()
export class AuthService {
    private static idCounter = 1;
    constructor(private jwtService: JwtService) { }

    async findByEmail(email: string): Promise<User | undefined> {
        return Users.find((user) => user.email === email);
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.findByEmail(email);
        if (user && (await bcrypt.compare(pass, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: User) {
        const payload = { email: user.email, sub: user.id };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: jwtConstants.accessTokenSecret,
                expiresIn: '15m',
            }),
        ]);

        return {
            access_token: accessToken,
        };
    }
}