import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty()
  @IsArray()
  imageUrls?: string[];

  @ApiProperty()
  @IsString()
  memo?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  recipeBookId: string;
}

export class UpdateRecipeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  thumbnailUrl?: string;

  @ApiProperty()
  @IsArray()
  imageUrls?: string[];

  @ApiProperty()
  @IsString()
  memo?: string;
}
