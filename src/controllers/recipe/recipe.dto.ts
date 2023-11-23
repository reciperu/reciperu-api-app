import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateRecipeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  imageUrls?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  recipeUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  faviconUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  appName?: string;
}

export class UpdateRecipeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  thumbnailUrl?: string;

  @ApiProperty()
  @IsArray()
  @IsOptional()
  imageUrls?: string[];

  @ApiProperty()
  @IsOptional()
  @IsString()
  memo?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  recipeUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  faviconUrl?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  appName?: string;
}
