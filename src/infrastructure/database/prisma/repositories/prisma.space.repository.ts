import { Injectable } from '@nestjs/common';
import {
  ISpaceRepository,
  Space,
  SpaceBeforePersist,
  RecipeBook,
} from 'src/domain';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import { PrismaClient } from '@prisma/client';
import { ActiveStatus, User } from 'src/domain/models';

const prismaSpaceType = async (prisma: PrismaClient, id: string) =>
  await prisma.space.findUnique({
    where: { id },
    include: {
      recipeBooks: true,
      spaceUsers: {
        include: {
          user: true,
        },
      },
    },
  });

type PrismaSpaceType = NonNullable<Awaited<ReturnType<typeof prismaSpaceType>>>;

@Injectable()
export class PrismaSpaceRepository implements ISpaceRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async insert(space: SpaceBeforePersist): Promise<Space> {
    const prismaSpace = await this.prismaService.space.create({
      data: {
        recipeBooks: {
          create: {
            name: space.recipeBookName,
          },
        },
        spaceUsers: {
          create: {
            userId: space.userId,
          },
        },
      },
      include: {
        recipeBooks: true,
        spaceUsers: {
          include: {
            user: true,
          },
        },
      },
    });
    return this.toSpace(prismaSpace);
  }

  // 現在、料理本は1つしか作成できないので、最初の要素を返す
  toSpace(space: PrismaSpaceType) {
    return new Space({
      id: space.id,
      recipeBook: new RecipeBook({
        id: space.recipeBooks[0].id,
        name: space.recipeBooks[0].name,
      }),
      users: space.spaceUsers.map(
        (spaceUser) =>
          new User(
            spaceUser.user.id,
            spaceUser.user.name,
            spaceUser.user.imageUrl,
            spaceUser.user.uid,
            spaceUser.user.activeStatus as ActiveStatus,
          ),
      ),
    });
  }
}
