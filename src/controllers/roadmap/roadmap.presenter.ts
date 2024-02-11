import { ApiProperty } from '@nestjs/swagger';

export enum RoadmapStatus {
  IN_PROGRESS = '対応中',
  BACKLOG = '未対応',
  COMPLETED = '対応済',
}

export class RoadmapPresenter {
  @ApiProperty()
  readonly id: string;

  @ApiProperty()
  readonly createdAt: string;

  @ApiProperty()
  readonly updatedAt: string;

  @ApiProperty()
  readonly publishedAt: string;

  @ApiProperty()
  readonly revisedAt: string;

  @ApiProperty()
  readonly title: string;

  @ApiProperty()
  readonly description: string;

  @ApiProperty({ enum: RoadmapStatus })
  readonly status: RoadmapStatus[];
}
