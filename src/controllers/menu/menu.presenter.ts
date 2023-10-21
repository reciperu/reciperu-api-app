import { ApiProperty } from '@nestjs/swagger';

class User {
  @ApiProperty()
  id: string;

  @ApiProperty()
  name: string;

  @ApiProperty()
  imageUrl?: string;
}

export class MenuPresenter {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  thumbnailUrl?: string;

  @ApiProperty()
  imageUrls?: string[];

  @ApiProperty()
  memo?: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  createdAt: Date;
}
