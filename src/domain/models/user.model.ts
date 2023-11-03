enum SpaceRole {
  OWNER = 'OWNER',
  MEMBER = 'MEMBER',
}

export enum ActiveStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_SPACE = 'JOINED_SPACE',
  NOT_JOINED_SPACE = 'NOT_JOINED_SPACE',
}

export class User {
  readonly id: string;
  readonly name: string;
  readonly imageUrl: string;
  readonly uid: string;
  readonly activeStatus: ActiveStatus;
  constructor({
    id,
    name,
    imageUrl,
    uid,
  }: {
    id: string;
    name: string;
    imageUrl: string;
    uid: string;
  }) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.uid = uid;
    if (!this.id) throw new Error('id is required');
    if (!this.name) throw new Error('name is required');
    if (!this.imageUrl) throw new Error('imageUrl is required');
    if (!this.uid) throw new Error('uid is required');
  }
}

export type UserBeforePersist = Omit<User, 'id'>;
