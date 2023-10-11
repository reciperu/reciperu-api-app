import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class UpdateRecipeDto {
  @ApiProperty()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsNumber()
  cost?: number;

  @ApiProperty()
  @IsString()
  indication?: string;

  @ApiProperty()
  @IsString()
  genreId?: number;

  @ApiProperty()
  @IsNotEmpty()
  imageUrl?: string;

  @ApiProperty()
  @IsString()
  recipeUrl?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  tagIds?: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  materials?: string[];
}
