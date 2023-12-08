import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  IRecipeBookInvitationRepository,
  RecipeBookInvitationBeforePersist,
  RecipeBookInvitation,
} from 'src/domain';
import { RecipeBookInvitation as PrismaInvitation } from '@prisma/client';

@Injectable()
export class PrismaRecipeBookInvitationRepository
  implements IRecipeBookInvitationRepository
{
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async save(
    recipeBookInvitation:
      | RecipeBookInvitationBeforePersist
      | RecipeBookInvitation,
  ): Promise<RecipeBookInvitation> {
    const prismaInvitation =
      await this.prismaService.recipeBookInvitation.upsert({
        where: {
          id: 'id' in recipeBookInvitation ? recipeBookInvitation.getId : '',
        },
        create: {
          token: recipeBookInvitation.getToken,
          expiredAt: recipeBookInvitation.getExpiredAt,
          recipeBookId: recipeBookInvitation.getRecipeBookId,
        },
        update: {
          token: recipeBookInvitation.getToken,
          expiredAt: recipeBookInvitation.getExpiredAt,
          recipeBookId: recipeBookInvitation.getRecipeBookId,
          usedAt:
            'id' in recipeBookInvitation
              ? recipeBookInvitation.getUsedAt
              : null,
        },
      });

    return this.toRecipeBookInvitation(prismaInvitation);
  }

  async findRecipeBookInvitation(
    token: string,
  ): Promise<RecipeBookInvitation | null> {
    const prismaInvitation =
      await this.prismaService.recipeBookInvitation.findUnique({
        where: {
          token,
        },
      });
    if (!prismaInvitation) {
      return null;
    }
    return this.toRecipeBookInvitation(prismaInvitation);
  }

  private toRecipeBookInvitation(prismaInvitation: PrismaInvitation) {
    return new RecipeBookInvitation({
      id: prismaInvitation.id,
      token: prismaInvitation.token,
      expiredAt: prismaInvitation.expiredAt,
      usedAt: prismaInvitation.usedAt,
      recipeBookId: prismaInvitation.recipeBookId,
    });
  }
}
