import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtProStrategy extends PassportStrategy(Strategy, 'jwtPro') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { id: string; email: string; isVerified: boolean }) {
    try {
      const professional = await this.prisma.professional.findUnique({
        where: {
          id: payload.id,
        },
      });
      return { id: professional.id, email: professional.email, isVerified: professional.isVerified };
    } catch (error) {
      console.log(error);
    }
  }
}
