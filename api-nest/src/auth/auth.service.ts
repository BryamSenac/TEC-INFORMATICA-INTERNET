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
import { JwtService } from '@nestjs/jwt';
import { Role } from './model/role.enum';

@Injectable()
export class AuthService {
  private static idCounter = 1;

  constructor(private readonly jwtService: JwtService) { }

  async register(registerDto: RegisterDto): Promise<{ access_token: string }> {
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
      roles: [Role.USER],
    };

    users.push(newUser);

    return this.generateToken(newUser);
  }

  async login(loginDto: LoginDto): Promise<{ access_token: string }> {
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

    return this.generateToken(user);
  }

  private async generateToken(user: User): Promise<{ access_token: string }> {
    const payload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      roles: user.roles,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }
}