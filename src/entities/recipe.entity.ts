import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from '@prisma/client';
import { TagEntity } from './tag.entity';
import { MaterialEntity } from './material.entity';

export class RecipeEntity implements Recipe {
  @ApiProperty()
  id: number;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  cost: number;

  @ApiProperty()
  indication: string;

  @ApiProperty()
  imageUrl: string;

  @ApiProperty()
  recipeUrl: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  spaceId: number;

  @ApiProperty()
  genreId: number;

  @ApiProperty({
    required: false,
    isArray: true,
    type: TagEntity,
  })
  tags?: TagEntity[];

  @ApiProperty({
    required: false,
    isArray: true,
    type: MaterialEntity,
  })
  materials?: MaterialEntity[];

  constructor(partial: Partial<RecipeEntity>) {
    Object.assign(this, partial);
    if (this.tags) {
      this.tags = this.tags.map((tag) => new TagEntity(tag));
    }
    if (this.materials) {
      this.materials = this.materials.map(
        (material) => new MaterialEntity(material),
      );
    }
  }
}
