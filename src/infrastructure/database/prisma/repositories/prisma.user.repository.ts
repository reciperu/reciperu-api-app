import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  ActiveStatus,
  User,
  UserBeforePersist,
  IUserRepository,
  SpaceRole,
} from 'src/domain';
import { User as PrismaUser } from '@prisma/client';

export type FindOptions = { uid: string } | { id: string };
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async findManyUsers(spaceId: string): Promise<User[]> {
    const users = await this.prismaService.user.findMany({
      where: {
        spaceUsers: {
          some: {
            spaceId: spaceId,
          },
        },
      },
    });
    return users.map((user) => this.toUser(user));
  }

  async create(user: UserBeforePersist): Promise<User> {
    const prismaUser = await this.prismaService.user.create({
      data: {
        name: user.name,
        imageUrl: user.imageUrl,
        uid: user.uid,
      },
    });
    return this.toUser(prismaUser);
  }

  async findUser(findOptions: FindOptions): Promise<null | User> {
    const user = await this.prismaService.user.findUnique({
      where:
        'id' in findOptions ? { id: findOptions.id } : { uid: findOptions.uid },
    });
    if (!user) {
      return null;
    }
    return this.toUser(user);
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { id: user.getId },
      data: {
        name: user.getName,
        imageUrl: user.getImageUrl,
        activeStatus: user.getActiveStatus,
      },
    });
    return this.toUser(updatedUser);
  }

  private toUser(user: PrismaUser) {
    return new User({
      id: user.id,
      name: user.name,
      imageUrl: user.imageUrl,
      uid: user.uid,
      activeStatus: user.activeStatus as ActiveStatus,
      spaceRole: user.spaceRole as SpaceRole,
    });
  }
}
