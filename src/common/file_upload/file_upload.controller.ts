import { Bind, Controller, UploadedFiles } from '@nestjs/common';
import { Injectable, Post, UploadedFile, UseInterceptors, } from '@nestjs/common';
import { FileInterceptor, FileFieldsInterceptor, FilesInterceptor, AnyFilesInterceptor } from '@nestjs/platform-express';
import { FileUploadService } from './file_upload.service';

@Controller('file')
export class FileUploadController {
  constructor(private fileUploadService: FileUploadService) {}

  @Post('/')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'file', maxCount: 1 },
      { name: 'file2', maxCount: 1 },
    ])
  )
  uploadFile(@UploadedFiles() files: { avatar?: Express.Multer.File[]; background?: Express.Multer.File[] }) {
    console.log(files);
  }

  @Post('/array')
  @UseInterceptors(FilesInterceptor('files',3))
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
