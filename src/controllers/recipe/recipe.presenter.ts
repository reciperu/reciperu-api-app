import { ApiProperty } from '@nestjs/swagger';
import { Recipe } from 'src/domain';

export class RecipePresenter {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  recipeBookId: string;

  @ApiProperty()
  userId: string;

  @ApiProperty()
  isFavorite: boolean;

  @ApiProperty()
  thumbnailUrl?: string;

  @ApiProperty()
  imageUrls?: string[];

  @ApiProperty()
  memo?: string;

  @ApiProperty()
  recipeUrl?: string;

  @ApiProperty()
  appName?: string;

  @ApiProperty()
  faviconUrl?: string;

  constructor(recipe: Recipe) {
    this.id = recipe.getId;
    this.title = recipe.getTitle;
    this.recipeBookId = recipe.getRecipeBookId;
    this.userId = recipe.getUserId;
    this.isFavorite = recipe.getIsFavorite;
    this.thumbnailUrl = recipe.getThumbnailUrl;
    this.imageUrls = recipe.getImageUrls;
    this.memo = recipe.getMemo;
    this.recipeUrl = recipe.getRecipeUrl;
    this.appName = recipe.getAppName;
    this.faviconUrl = recipe.getFaviconUrl;
  }
}

export class RecipeMetaDataPresenter {
  @ApiProperty()
  title?: string;

  @ApiProperty()
  thumbnailUrl?: string;

  @ApiProperty()
  appName?: string;

  @ApiProperty()
  faviconUrl?: string;
}
