import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt/dist';
import { PrismaService } from 'src/common/prisma/prisma.service';
import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {}
  async signupClient(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const client = await this.prisma.client.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return this.signToken(client.id, client.email);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Cet email est déjà utilisé');
      } else {
        throw error;
      }
    }
  }
  async signinClient(dto: AuthDto) {
    const client = await this.prisma.client.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!client) throw new ForbiddenException("Aucun compte n'est associé à cette adresse mail");
    const pwMatches = await argon.verify(client.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Mot de passe incorrect');
    console.log({
      pwMatches,
    });

    return this.signToken(client.id, client.email);
  }

  async signupProfessional(dto: AuthDto) {
    try {
      const hash = await argon.hash(dto.password);
      const professional = await this.prisma.professional.create({
        data: {
          email: dto.email,
          hash,
        },
      });
      return this.signToken(professional.id, professional.email, professional.isVerified);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
        throw new ForbiddenException('Cet email est déjà utilisé');
      } else {
        throw error;
      }
    }
  }
  async signinProfessional(dto: AuthDto) {
    const professional = await this.prisma.professional.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!professional) throw new ForbiddenException("Aucun compte n'est associé à cette adresse mail");
    const pwMatches = await argon.verify(professional.hash, dto.password);
    if (!pwMatches) throw new ForbiddenException('Mot de passe incorrect');
    console.log({
      pwMatches,
    });
    return this.signToken(professional.id, professional.email, professional.isVerified);
  }

  async signToken(id: number | string, email: string, isVerified?: boolean): Promise<{ access_token: string }> {
    const payload = {
      id,
      email,
      isVerified,
    };
    const secret = this.config.get('JWT_SECRET');
    const token = await this.jwt.signAsync(payload, {
      secret,
    });
    return {
      access_token: token,
    };
  }
}
