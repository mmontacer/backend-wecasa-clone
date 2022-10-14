import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('clients')
export class UserController {
  @UseGuards(AuthGuard('jwtClient'))
  @Get('protected')
  getMe(@Req() req: Request) {
    console.log(req.user);
    return req.user;
  }
}
