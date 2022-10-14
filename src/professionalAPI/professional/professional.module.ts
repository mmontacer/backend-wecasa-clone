import { Module } from '@nestjs/common';
import { ProfessionalService } from './professional.service';
import { ProfessionalController } from './professional.controller';

@Module({
  providers: [ProfessionalService],
  controllers: [ProfessionalController]
})
export class ProfessionalModule {}
