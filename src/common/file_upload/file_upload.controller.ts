import { Bind, Controller, UploadedFiles } from '@nestjs/common';
import { Injectable, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import {
  FileInterceptor,
  FileFieldsInterceptor,
  FilesInterceptor,
  AnyFilesInterceptor,
} from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';

@Controller('files')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}
  @Post('/register-pro')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'diplome', maxCount: 1 },
      { name: 'cin', maxCount: 2 },
      { name: 'profilePhotoWithCin', maxCount: 1 },
    ])
  )
  uploadFile(@UploadedFiles() files: { diplome: Express.Multer.File[]; cin: Express.Multer.File[] }) {
    console.log(files);
  }

  @Post('/array')
  @UseInterceptors(FilesInterceptor('files', 3))
  @Bind(UploadedFiles())
  uploadFiles(files) {
    console.log(files);
  }

  @Post('any')
  @UseInterceptors(AnyFilesInterceptor())
  uploadFileAny(@UploadedFiles() files: Array<Express.Multer.File>) {
    console.log(files);
  }
}
