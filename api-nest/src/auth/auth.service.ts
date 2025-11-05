import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './model/user.interface';
import { users } from './model/user.bd';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private static idCounter = 1;

  async register(registerDto: RegisterDto): Promise<Omit<User, 'password'>> {
    const existingUser = users.find(
      (user) => user.email === registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('O e-mail fornecido já está em uso');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.password, salt);

    const newUser: User = {
      id: AuthService.idCounter++,
      name: registerDto.name,
      email: registerDto.email,
      password: hashedPassword,
    };

    users.push(newUser);

    const { password, ...result } = newUser;
    return result;
  }
}