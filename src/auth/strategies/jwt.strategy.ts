// src/auth/strategies/jwt.strategy.ts

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'secretKey123',
    });
    console.log('✅ JwtStrategy inicializada con secreto:', process.env.JWT_SECRET || 'secretKey123');
  }

  async validate(payload: any) {
    console.log('🔍 Validando payload JWT:', payload);
    
    if (!payload) {
      throw new UnauthorizedException('Token inválido');
    }

    const user = {
      userId: payload.sub,
      email: payload.email,
      role: payload.role,
    };
    
    console.log('✅ Usuario validado:', user);
    return user;
  }
}
