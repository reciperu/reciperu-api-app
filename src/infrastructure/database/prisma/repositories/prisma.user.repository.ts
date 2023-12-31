import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  ActiveStatus,
  User,
  UserBeforePersist,
  IUserRepository,
  RecipeBookRole,
  RecipeBookInvitation,
} from 'src/domain';
import { User as PrismaUser } from '@prisma/client';

export type FindOptions = { uid: string } | { id: string };
@Injectable()
export class PrismaUserRepository implements IUserRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async create(user: UserBeforePersist): Promise<User> {
    const prismaUser = await this.prismaService.$transaction(async (tx) => {
      const recipeBook = await tx.recipeBook.create({
        data: {
          name: `${user.getName}の料理本`,
        },
      });
      return await tx.user.create({
        data: {
          name: user.getName,
          imageUrl: user.getImageUrl,
          uid: user.getUid,
          currentRecipeBookId: recipeBook.id,
          recipeBookUsers: {
            create: {
              recipeBookId: recipeBook.id,
            },
          },
        },
        include: {
          recipeBookUsers: true,
        },
      });
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
        activeStatus: user.getActiveStatus as ActiveStatus,
        currentRecipeBookRole: user.getRecipeBookRole as RecipeBookRole,
      },
    });
    return this.toUser(updatedUser);
  }

  async updateWithRecipeBook(
    user: User,
    invitation: RecipeBookInvitation,
  ): Promise<User> {
    return await this.prismaService.$transaction(async (tx) => {
      const prismaUser = await tx.user.update({
        where: { id: user.getId },
        data: {
          currentRecipeBookId: user.getRecipeBookId,
          currentRecipeBookRole: user.getRecipeBookRole as RecipeBookRole,
        },
      });
      await tx.recipeBookUser.create({
        data: {
          userId: user.getId,
          recipeBookId: user.getRecipeBookId,
          recipeBookRole: user.getRecipeBookRole as RecipeBookRole,
        },
      });
      await tx.recipeBookInvitation.update({
        where: { id: invitation.getId },
        data: {
          usedAt: invitation.getUsedAt,
        },
      });
      return this.toUser(prismaUser);
    });
  }

  private toUser(user: PrismaUser) {
    return new User({
      id: user.id,
      name: user.name,
      imageUrl: user.imageUrl,
      uid: user.uid,
      activeStatus: user.activeStatus as ActiveStatus,
      recipeBookId: user.currentRecipeBookId,
      recipeBookRole: user.currentRecipeBookRole as RecipeBookRole,
    });
  }
}
