import { Module } from '@nestjs/common';
import { FileUploadController } from './file_upload.controller';
import { FileUploadService } from './file_upload.service';

@Module({})
export class FileUploadModule {
  controllers: [FileUploadController];

  providers: [FileUploadService];
}
