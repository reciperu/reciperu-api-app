import { Injectable } from '@nestjs/common';
import { IRequestedRecipeRepository } from 'src/domain';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaRequestedRecipeRepository
  implements IRequestedRecipeRepository
{
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }
  async create(userId: string, recipeId: string): Promise<void> {
    await this.prismaService.requestedRecipe.create({
      data: {
        userId,
        recipeId,
      },
    });
  }

  async delete(userId: string, recipeId: string): Promise<void> {
    await this.prismaService.requestedRecipe.delete({
      where: {
        userId_recipeId: {
          userId,
          recipeId,
        },
      },
    });
  }
}
