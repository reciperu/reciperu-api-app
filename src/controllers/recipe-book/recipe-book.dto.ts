import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import type {
  CreateRecipeBookDto as DomainCreateRecipeBookDto,
  UpdateRecipeBookDto as DomainUpdateRecipeBookDto,
} from 'src/domain';
export class CreateRecipeBookDto implements DomainCreateRecipeBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}

export class UpdateRecipeBookDto implements DomainUpdateRecipeBookDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
