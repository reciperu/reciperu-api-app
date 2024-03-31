import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  ActiveStatus,
  User,
  UserBeforePersist,
  IUserRepository,
  SpaceRole,
  SpaceInvitation,
} from 'src/domain';
import { User as PrismaUser } from '@prisma/client';

export type FindOptions = { uid: string } | { userId: string };
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async create(user: UserBeforePersist): Promise<User> {
    const prismaUser = await this.prismaService.$transaction(async (tx) => {
      const space = await tx.space.create({
        data: {
          name: `${user.getName}のスペース`,
        },
      });
      return await tx.user.create({
        data: {
          name: user.getName,
          imageUrl: user.getImageUrl,
          uid: user.getUid,
          spaceId: space.spaceId,
        },
      });
    });

    return this.toUser(prismaUser);
  }

  async findUser(findOptions: FindOptions): Promise<null | User> {
    const user = await this.prismaService.user.findUnique({
      where:
        'userId' in findOptions
          ? { userId: findOptions.userId }
          : { uid: findOptions.uid },
    });
    if (!user) {
      return null;
    }
    return this.toUser(user);
  }

  async update(user: User): Promise<User> {
    const updatedUser = await this.prismaService.user.update({
      where: { userId: user.getId },
      data: {
        name: user.getName,
        imageUrl: user.getImageUrl,
        activeStatus: user.getActiveStatus as ActiveStatus,
      },
    });
    return this.toUser(updatedUser);
  }

  async updateWithSpace(
    user: User,
    invitation: SpaceInvitation,
  ): Promise<User> {
    return await this.prismaService.$transaction(async (tx) => {
      const prismaUser = await tx.user.update({
        where: { userId: user.getId },
        data: {
          spaceRole: user.getSpaceRole as SpaceRole,
          spaceId: user.getSpaceId,
        },
      });
      await tx.spaceInvitation.update({
        where: { token: invitation.getToken },
        data: {
          usedAt: invitation.getUsedAt,
        },
      });
      return this.toUser(prismaUser);
    });
  }

  toUser(user: PrismaUser) {
    return new User({
      id: user.userId,
      name: user.name,
      imageUrl: user.imageUrl,
      uid: user.uid,
      activeStatus: user.activeStatus as ActiveStatus,
      spaceId: user.spaceId,
      spaceRole: user.spaceRole as SpaceRole,
    });
  }
}
