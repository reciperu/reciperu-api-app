import { Injectable } from '@nestjs/common';
import {
  RecipeBook,
  User,
  IRecipeBookRepository,
  ActiveStatus,
  RecipeBookRole,
} from 'src/domain';
import { PrismaService } from '../prisma.service';
import { PrismaClient } from '@prisma/client';
const prismaRecipeBookType = async (prisma: PrismaClient, id: string) =>
  await prisma.recipeBook.findUnique({
    where: { id },
    include: {
      recipeBookUsers: {
        include: {
          user: true,
        },
      },
    },
  });

type PrismaRecipeBookType = NonNullable<
  Awaited<ReturnType<typeof prismaRecipeBookType>>
>;
@Injectable()
export class PrismaRecipeBookRepository implements IRecipeBookRepository {
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async findRecipeBook(id: string): Promise<RecipeBook> {
    const prismaRecipeBook = await this.prismaService.recipeBook.findUnique({
      where: { id },
      include: {
        recipeBookUsers: {
          include: {
            user: true,
          },
        },
      },
    });
    if (!prismaRecipeBook) {
      return null;
    }
    return this.toRecipeBook(prismaRecipeBook);
  }

  private toRecipeBook(prismaRecipeBook: PrismaRecipeBookType): RecipeBook {
    return new RecipeBook({
      id: prismaRecipeBook.id,
      name: prismaRecipeBook.name,
      users: prismaRecipeBook.recipeBookUsers.map(
        (recipeBookUser) =>
          new User({
            id: recipeBookUser.user.id,
            name: recipeBookUser.user.name,
            imageUrl: recipeBookUser.user.imageUrl,
            uid: recipeBookUser.user.uid,
            activeStatus: recipeBookUser.user.activeStatus as ActiveStatus,
            recipeBookId: recipeBookUser.user.currentRecipeBookId,
            recipeBookRole: recipeBookUser.recipeBookRole as RecipeBookRole,
          }),
      ),
    });
  }
}
