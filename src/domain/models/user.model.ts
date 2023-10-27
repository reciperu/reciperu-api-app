enum SpaceRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export class User {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly identifier: string;
  constructor({
    id,
    name,
    imageUrl,
    identifier,
  }: {
    id: string;
    name: string;
    imageUrl: string;
    identifier: string;
  }) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.identifier = identifier;
    if (!this.id) throw new Error('id is required');
    if (!this.name) throw new Error('name is required');
    if (!this.imageUrl) throw new Error('imageUrl is required');
    if (!this.identifier) throw new Error('identifier is required');
  }
}

export type UserBeforePersist = Omit<User, 'id'>;
