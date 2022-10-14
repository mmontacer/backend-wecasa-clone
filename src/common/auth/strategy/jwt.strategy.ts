import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtClientStrategy extends PassportStrategy(Strategy, 'jwtClient') {
  constructor(config: ConfigService, private prisma: PrismaService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }
  async validate(payload: { id: number }) {
    try {
      const user = await this.prisma.client.findUnique({
        where: {
          id: payload.id,
        },
      });
      return user.id;
    } catch (error) {
      console.log(error);
    }
  }
}
