import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateRecipeBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
