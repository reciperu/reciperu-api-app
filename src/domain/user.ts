import { BadRequestException } from 'src/infrastructure/exceptions';
import { SpaceInvitation } from './space';
export enum SpaceRole {
  OWNER = 'OWNER',
  PARTICIPANT = 'PARTICIPANT',
}

export enum ActiveStatus {
  ONBOARDING = 'ONBOARDING',
  JOINED_SPACE = 'JOINED_SPACE',
  NOT_JOINED_SPACE = 'NOT_JOINED_SPACE',
}

export class UserBeforePersist {
  private name: string;
  private imageUrl: string;
  private uid: string;
  constructor({
    name,
    imageUrl,
    uid,
  }: {
    name: string;
    imageUrl: string;
    uid: string;
  }) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.uid = uid;
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

  set setName(name: string) {
    this.name = name;
  }
  set setImageUrl(imageUrl: string) {
    this.imageUrl = imageUrl;
  }
}

export class User extends UserBeforePersist {
  private id: string;
  private activeStatus: ActiveStatus;
  private spaceId: string;
  private spaceRole: SpaceRole;
  private mySpaceId: string;

  constructor({
    id,
    name,
    imageUrl,
    uid,
    activeStatus,
    spaceId,
    spaceRole,
    mySpaceId,
  }: {
    id: string;
    name: string;
    imageUrl: string;
    uid: string;
    activeStatus: ActiveStatus;
    spaceId: string;
    spaceRole: SpaceRole;
    mySpaceId: string;
  }) {
    super({ name, imageUrl, uid });
    this.id = id;
    this.activeStatus = activeStatus;
    this.spaceId = spaceId;
    this.spaceRole = spaceRole;
    this.mySpaceId = mySpaceId;
  }
  get getId(): string {
    return this.id;
  }

  get getActiveStatus(): ActiveStatus {
    return this.activeStatus;
  }
  get getSpaceId(): string {
    return this.spaceId;
  }
  get getSpaceRole(): SpaceRole {
    return this.spaceRole;
  }

  get getMySpaceId(): string {
    return this.mySpaceId;
  }

  set setActiveStatus(activeStatus: ActiveStatus) {
    this.activeStatus = activeStatus;
  }

  update({
    name,
    imageUrl,
    activeStatus,
  }: {
    name: string;
    imageUrl: string;
    activeStatus: ActiveStatus;
  }): void {
    this.setName = name;
    this.setImageUrl = imageUrl;
    this.setActiveStatus = activeStatus;
  }

  joinSpace(spaceId: string): void {
    this.spaceId = spaceId;
    this.spaceRole = SpaceRole.PARTICIPANT;
  }

  canUpdateSpace(): void {
    if (this.spaceRole !== SpaceRole.OWNER) {
      throw new BadRequestException('USER_NOT_OWNER');
    }
  }

  canInviteSpace(): void {
    if (this.getSpaceRole !== SpaceRole.OWNER) {
      throw new BadRequestException('USER_NOT_OWNER');
    }
  }
  changeSpace(spaceId: string): void {
    this.spaceId = spaceId;
  }
}

export type IUserRepository = {
  create(user: UserBeforePersist): Promise<User>;
  findUser(
    findOptions: { uid: string } | { userId: string },
  ): Promise<User | null>;
  findUsersBySpaceId(spaceId: string): Promise<User[] | null>;
  update(user: User): Promise<User>;
  updateWithSpace(user: User, invitation: SpaceInvitation): Promise<User>;
};

export type UpdateUserDto = {
  name: string;
  imageUrl: string;
  activeStatus: ActiveStatus;
};
