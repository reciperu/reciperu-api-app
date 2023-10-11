import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  cost: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  indication: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  genreId: number;

  @ApiProperty()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty()
  @IsString()
  recipeUrl: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  tagIds: string[];

  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  materialIds: string[];
}
