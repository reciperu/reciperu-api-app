import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import type {
  UpdateRecipeDto as DomainUpdateRecipeDto,
  CreateRecipeDto as DomainCreateRecipeDto,
  CreateRequestedRecipeDto as DomainCreateRequestedRecipeDto,
} from 'src/domain';
export class CreateRecipeDto implements DomainCreateRecipeDto {
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

export class CreateRequestedRecipeDto
  implements DomainCreateRequestedRecipeDto
{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  recipeId: number;
}
