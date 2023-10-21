import { ApiProperty } from '@nestjs/swagger';

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
