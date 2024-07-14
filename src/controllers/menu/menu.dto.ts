import { ApiProperty } from '@nestjs/swagger';
import {
  CreateMenuDto as DomainCreateMenuDto,
  UpdateMenuDto as DomainUpdateMenuDto,
  MenuStatus,
} from 'src/domain';

export class CreateMenuDto implements DomainCreateMenuDto {
  @ApiProperty()
  recipeId: number;

  @ApiProperty()
  scheduledAt?: Date;
}

export class UpdateMenuDto implements DomainUpdateMenuDto {
  @ApiProperty()
  status: MenuStatus;

  @ApiProperty()
  scheduledAt?: Date;
}
