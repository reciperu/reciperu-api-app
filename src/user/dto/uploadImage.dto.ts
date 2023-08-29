import { ApiProperty } from '@nestjs/swagger';
export class UploadImageDto {
  @ApiProperty({
    description: 'image',
    type: 'string',
    format: 'binary',
  })
  file: Express.Multer.File;
}
