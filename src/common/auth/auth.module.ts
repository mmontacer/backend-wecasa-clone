/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaModule } from 'src/common/prisma/prisma.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtClientStrategy, } from './strategy';
import { JwtProStrategy } from './strategy/jwtPro.strategy';

@Module({
  imports: [JwtModule.register({})],

  controllers: [AuthController],

  providers: [AuthService, JwtClientStrategy, JwtProStrategy],
})
export class AuthModule {}
