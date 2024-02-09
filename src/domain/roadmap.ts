export enum RoadmapStatus {
  IN_PROGRESS = '対応中',
  BACKLOG = '未対応',
  COMPLETED = '対応済',
}

export class Roadmap {
  private id: string;
  private createdAt: string;
  private updatedAt: string;
  private publishedAt: string;
  private revisedAt: string;
  private title: string;
  private description: string;
  private status: RoadmapStatus[];

  constructor({
    id,
    createdAt,
    updatedAt,
    publishedAt,
    revisedAt,
    title,
    description,
    status,
  }: {
    id: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    revisedAt: string;
    title: string;
    description: string;
    status: RoadmapStatus[];
  }) {
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.publishedAt = publishedAt;
    this.revisedAt = revisedAt;
    this.title = title;
    this.description = description;
    this.status = status;
  }
  get getId(): string {
    return this.id;
  }
  get getCreatedAt(): string {
    return this.createdAt;
  }
  get getUpdatedAt(): string {
    return this.updatedAt;
  }
  get getPublishedAt(): string {
    return this.publishedAt;
  }
  get getRevisedAt(): string {
    return this.revisedAt;
  }
  get getTitle(): string {
    return this.title;
  }
  get getDescription(): string {
    return this.description;
  }
  get getStatus(): RoadmapStatus[] {
    return this.status;
  }
}
