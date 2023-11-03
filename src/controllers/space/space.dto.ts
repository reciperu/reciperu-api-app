import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSpaceDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipeBookName: string;
}
