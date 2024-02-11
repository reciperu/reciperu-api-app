import { Injectable } from '@nestjs/common';
import {
  User,
  Space,
  ActiveStatus,
  SpaceRole,
  ISpaceRepository,
} from 'src/domain';
import { PrismaService } from '../prisma.service';
import { PrismaClient, Space as PrismaSpace } from '@prisma/client';
const prismaSpaceType = async (prisma: PrismaClient, spaceId: string) =>
  await prisma.space.findUnique({
    where: { spaceId },
    include: {
      users: true,
    },
  });

type PrismaSpaceType = NonNullable<Awaited<ReturnType<typeof prismaSpaceType>>>;
@Injectable()
export class PrismaSpaceRepository implements ISpaceRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async findSpace(spaceId: string): Promise<Space> {
    const prismaSpace = await this.prismaService.space.findUnique({
      where: { spaceId },
      include: {
        users: true,
      },
    });
    if (!prismaSpace) {
      return null;
    }
    return this.toSpace(prismaSpace);
  }

  async updateSpace(space: Space): Promise<Space> {
    const prismaSpace = await this.prismaService.space.update({
      where: { spaceId: space.getId },
      data: {
        name: space.getName,
      },
    });
    if (!prismaSpace) {
      return null;
    }
    return this.toSpace(prismaSpace);
  }

  private toSpace(prismaSpace: PrismaSpaceType | PrismaSpace): Space {
    return 'users' in prismaSpace
      ? new Space({
          id: prismaSpace.spaceId,
          name: prismaSpace.name,
          users: prismaSpace.users.map(
            (user) =>
              new User({
                id: user.userId,
                name: user.name,
                imageUrl: user.imageUrl,
                uid: user.uid,
                activeStatus: user.activeStatus as ActiveStatus,
                spaceId: user.spaceId,
                spaceRole: user.spaceRole as SpaceRole,
              }),
          ),
        })
      : new Space({
          id: prismaSpace.spaceId,
          name: prismaSpace.name,
          users: [],
        });
  }
}
