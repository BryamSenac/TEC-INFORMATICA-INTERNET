import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'SEU_SEGREDO_SUPER_SECRETO_E_LONGO_123456',
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email, name: payload.name };
  }
}