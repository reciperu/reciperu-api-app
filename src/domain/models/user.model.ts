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

  set setName(name: string) {
    this.name = name;
  }
  set setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
  set setActiveStatus(activeStatus: ActiveStatus) {
    this.activeStatus = activeStatus;
  }

  update(name: string, imageUrl: string, activeStatus: ActiveStatus): void {
    this.setName = name;
    this.setImageUrl = imageUrl;
    this.setActiveStatus = activeStatus;
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
