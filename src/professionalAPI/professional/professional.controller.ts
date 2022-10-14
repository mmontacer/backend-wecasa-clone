import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

import { ProfessionalService } from './professional.service';
@Controller('professionals')
export class ProfessionalController {
  constructor(private professionalService: ProfessionalService) {}
  @UseGuards(AuthGuard('jwtPro'))
  @Get('protected')
  getMe(@Req() req: Request) {
    return req.user;
  }
}
