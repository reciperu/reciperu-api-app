import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import type { UpdateRecipeDto as DomainUpdateRecipeDto } from 'src/domain';
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

export class UpdateRecipeDto implements DomainUpdateRecipeDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty()
  @IsBoolean()
  isFavorite: boolean;

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
