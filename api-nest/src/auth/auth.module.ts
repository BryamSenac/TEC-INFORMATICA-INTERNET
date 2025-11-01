import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

export const jwtConstants = {
  accessTokenSecret: 'SEGREDO_DO_ACCESS_TOKEN_123',
  refreshTokenSecret: 'SEGREDO_DO_REFRESH_TOKEN_ABC',
};

@Module({
  imports: [
    PassportModule,
    JwtModule.register({}),
  ],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
  ],
  controllers: [AuthController],
})
export class AuthModule {}