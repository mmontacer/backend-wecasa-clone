import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { AuthModule } from './common/auth/auth.module';
import { UserModule } from './clientAPI/user/user.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { FileUploadController } from './common/file_upload/file_upload.controller';
import { FileUploadService } from './common/file_upload/file_upload.service';
import { FileUploadModule } from './common/file_upload/file_upload.module';
import { ProfessionalModule } from './professionalAPI/professional/professional.module';
import { OrdersModule } from './common/orders/orders.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    FileUploadModule,
    ProfessionalModule,
    OrdersModule,
  ],
  controllers: [FileUploadController],
  providers: [FileUploadService],
})
export class AppModule {}
