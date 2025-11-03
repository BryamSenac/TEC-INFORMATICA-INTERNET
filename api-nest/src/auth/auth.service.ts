import { Injectable, ConflictException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { User } from './model/user.interface';
import { users } from './model/user.bd';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private static idCounter = 1;

  async register(registerDto: RegisterDto): Promise<Omit<User, 'senha'>> {
    const existingUser = users.find(
      (user) => user.email === registerDto.email,
    );

    if (existingUser) {
      throw new ConflictException('O e-mail fornecido já está em uso');
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(registerDto.senha, salt);

    const newUser: User = {
      id: AuthService.idCounter++,
      nome: registerDto.nome,
      email: registerDto.email,
      senha: hashedPassword,
    };

    users.push(newUser);

    const { senha, ...result } = newUser;
    return result;
  }
}