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
  constructor(
    private id: string,
    private name: string,
    private imageUrl: string,
    private uid: string,
    private activeStatus: ActiveStatus,
  ) {
    this.id = id;
    this.name = name;
    this.imageUrl = imageUrl;
    this.uid = uid;
    if (!this.id) throw new Error('id is required');
    if (!this.name) throw new Error('name is required');
    if (!this.imageUrl) throw new Error('imageUrl is required');
    if (!this.uid) throw new Error('uid is required');
  }
  get getId(): string {
    return this.id;
  }
  get getName(): string {
    return this.name;
  }
  get getImageUrl(): string {
    return this.imageUrl;
  }
  get getUid(): string {
    return this.uid;
  }
  get getActiveStatus(): ActiveStatus {
    return this.activeStatus;
  }
}

export class UserBeforePersist {
  constructor(
    readonly name: string,
    readonly imageUrl: string,
    readonly uid: string,
  ) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.uid = uid;
  }
}
