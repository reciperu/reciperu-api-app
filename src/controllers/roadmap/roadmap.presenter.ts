import { ApiProperty } from '@nestjs/swagger';
import { Roadmap, RoadmapStatus } from 'src/domain';

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

  constructor(roadmap: Roadmap) {
    this.id = roadmap.getId;
    this.createdAt = roadmap.getCreatedAt;
    this.updatedAt = roadmap.getUpdatedAt;
    this.publishedAt = roadmap.getPublishedAt;
    this.revisedAt = roadmap.getRevisedAt;
    this.title = roadmap.getTitle;
    this.description = roadmap.getDescription;
    this.status = roadmap.getStatus;
  }
}
