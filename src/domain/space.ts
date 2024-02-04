import { User } from '.';
import { randomUUID } from 'crypto';
import * as dayjs from 'dayjs';
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
  generateToken(): void {
    this.token = randomUUID();
  }
  set setToken(token: string) {
    this.token = token;
  }
}

export class SpaceInvitation extends SpaceInvitationBeforePersist {
  private id: string;
  private usedAt: Date;
  constructor({
    id,
    usedAt,
    token,
    spaceId,
  }: {
    id: string;
    token: string;
    expiredAt: Date;
    usedAt: Date;
    spaceId: string;
  }) {
    super({
      spaceId,
    });
    this.id = id;
    this.usedAt = usedAt;
    this.setToken = token;
  }

  get getId(): string {
    return this.id;
  }

  get getUsedAt(): Date {
    return this.usedAt;
  }

  validate(): void {
    if (dayjs().isAfter(this.getExpiredAt)) {
      throw new Error('token is expired');
    }
  }

  useToken(): void {
    this.usedAt = dayjs().toDate();
  }
}

export type ISpaceRepository = {
  findSpace(id: string): Promise<Space>;
  updateSpace(space: Space): Promise<Space>;
};

export type ISpaceInvitationRepository = {
  save(
    spaceInvitationBeforePersist: SpaceInvitationBeforePersist,
  ): Promise<SpaceInvitation>;
  findSpaceInvitation(token: string): Promise<SpaceInvitation | null>;
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
