import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class UpsertSpaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
