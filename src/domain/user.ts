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
  private filename: string;
  private uid: string;
  constructor({
    name,
    imageUrl,
    filename,
    uid,
  }: {
    name: string;
    imageUrl: string;
    filename: string;
    uid: string;
  }) {
    this.name = name;
    this.imageUrl = imageUrl;
    this.filename = filename;
    this.uid = uid;
  }
  get getName(): string {
    return this.name;
  }
  get getImageUrl(): string {
    return this.imageUrl;
  }
  get getFilename(): string {
    return this.filename;
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
  set setFilename(filename: string) {
    this.filename = filename;
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
    filename,
    uid,
    activeStatus,
    spaceId,
    spaceRole,
    mySpaceId,
  }: {
    id: string;
    name: string;
    imageUrl: string;
    filename: string;
    uid: string;
    activeStatus: ActiveStatus;
    spaceId: string;
    spaceRole: SpaceRole;
    mySpaceId: string;
  }) {
    super({ name, imageUrl, uid, filename });
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
    filename,
    activeStatus,
  }: {
    name: string;
    imageUrl: string;
    filename: string;
    activeStatus: ActiveStatus;
  }): void {
    this.setName = name;
    this.setImageUrl = imageUrl;
    this.setFilename = filename;
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

export class UserTokenBeforePersist {
  private token: string;
  private deviceId: string;
  private userId: string;
  constructor({
    userId,
    deviceId,
    token,
  }: {
    userId: string;
    deviceId: string;
    token: string;
  }) {
    this.userId = userId;
    this.deviceId = deviceId;
    this.token = token;
  }
  get getToken(): string {
    return this.token;
  }

  get getDeviceId(): string {
    return this.deviceId;
  }

  get getUserId(): string {
    return this.userId;
  }

  set setToken(token: string) {
    this.token = token;
  }
}

export class UserToken extends UserTokenBeforePersist {
  private id: string;
  private lastActive: Date;
  constructor({
    id,
    token,
    deviceId,
    lastActive,
    userId,
  }: {
    id: string;
    token: string;
    deviceId: string;
    lastActive: Date;
    userId: string;
  }) {
    super({
      userId,
      deviceId,
      token,
    });
    this.id = id;
    this.setToken = token;
    this.lastActive = lastActive;
  }
  get getId(): string {
    return this.id;
  }

  get getLastActive(): Date {
    return this.lastActive;
  }

  update(token: string): void {
    this.setToken = token;
    this.lastActive = new Date();
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

export type IUserTokenRepository = {
  save(userTokenBeforePersist: UserTokenBeforePersist): Promise<UserToken>;
  findUserToken(userId: string, deviceId: string): Promise<UserToken | null>;
  findUserTokens(userId: string): Promise<UserToken[] | null>;
};

export type UpdateUserDto = {
  name: string;
  imageUrl: string;
  activeStatus: ActiveStatus;
};

export type UpdateUserTokenDto = {
  deviceId: string;
  token: string;
};
