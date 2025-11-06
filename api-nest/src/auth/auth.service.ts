import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { User } from './model/user.interface'; 
import { users } from './model/user.bd';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  private static idCounter = 1;

  constructor() {}

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

  async login(loginDto: LoginDto): Promise<Omit<User, 'password'>> {
    const user = users.find((u) => u.email === loginDto.email);

    if (!user) {
      throw new UnauthorizedException('E-mail não encontrado');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('E-mail ou senha inválidos');
    }

    const { password, ...result } = user;
    return result;
  }
}