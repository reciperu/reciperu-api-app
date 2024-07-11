import { User } from '.';
import * as dayjs from 'dayjs';
import { nanoid } from 'nanoid';
export class Space {
  private id: string;
  private name: string;
  private users: User[];
  constructor({
    id,
    name,
    users,
  }: {
    id: string;
    name: string;
    users: User[];
  }) {
    this.id = id;
    this.name = name;
    this.users = users;
  }

  get getId(): string {
    return this.id;
  }
  get getName(): string {
    return this.name;
  }
  get getUsers(): User[] {
    return this.users;
  }

  set setName(name: string) {
    this.name = name;
  }

  update(updateSpaceDto: UpdateSpaceDto) {
    this.setName = updateSpaceDto.name;
  }
}

export class SpaceInvitationBeforePersist {
  private token: string;
  private expiredAt: Date;
  private spaceId: string;
  constructor({ spaceId }: { spaceId: string }) {
    this.spaceId = spaceId;
    this.expiredAt = dayjs().add(1, 'day').toDate();
  }
  get getSpaceId(): string {
    return this.spaceId;
  }

  get getToken(): string {
    return this.token;
  }

  get getExpiredAt(): Date {
    return this.expiredAt;
  }
  generateAndSetToken(): void {
    this.token = nanoid(6);
  }
  set setToken(token: string) {
    this.token = token;
  }
}

export class SpaceInvitation extends SpaceInvitationBeforePersist {
  private usedAt: Date;
  constructor({
    usedAt,
    token,
    spaceId,
  }: {
    token: string;
    expiredAt: Date;
    usedAt: Date;
    spaceId: string;
  }) {
    super({
      spaceId,
    });
    this.usedAt = usedAt;
    this.setToken = token;
  }

  get getUsedAt(): Date {
    return this.usedAt;
  }

  validate(): void {
    if (!this.isValid()) {
      throw new Error('token is expired');
    }
  }

  isValid(): boolean {
    return dayjs().isBefore(this.getExpiredAt);
  }

  useToken(): void {
    this.usedAt = dayjs().toDate();
  }
}

export type ISpaceRepository = {
  findSpace(id: string): Promise<Space | null>;
  updateSpace(space: Space): Promise<Space>;
  deleteSpace(id: string): Promise<void>;
};

export type ISpaceInvitationRepository = {
  save(
    spaceInvitationBeforePersist: SpaceInvitationBeforePersist,
  ): Promise<SpaceInvitation>;
  findSpaceInvitationByToken(token: string): Promise<SpaceInvitation | null>;
  findSpaceInvitationsBySpaceId(spaceId: string): Promise<SpaceInvitation[]>;
};

export type CreateSpaceDto = {
  name: string;
};

export type UpdateSpaceDto = {
  name: string;
};

export type ValidateInvitationDto = {
  token: string;
};
