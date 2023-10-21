import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateRecipeBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
