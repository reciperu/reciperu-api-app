import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  IRecipeBookInvitationRepository,
  RecipeBookInvitationBeforePersist,
} from 'src/domain';

@Injectable()
export class PrismaRecipeBookInvitationRepository
  implements IRecipeBookInvitationRepository
{
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async create(
    recipeBookInvitationBeforePersist: RecipeBookInvitationBeforePersist,
  ): Promise<{ token: string }> {
    const prismaUser = await this.prismaService.recipeBookInvitation.create({
      data: {
        token: recipeBookInvitationBeforePersist.getToken,
        expiredAt: recipeBookInvitationBeforePersist.getExpiredAt,
        recipeBookId: recipeBookInvitationBeforePersist.getRecipeBookId,
      },
    });
    return {
      token: prismaUser.token,
    };
  }
}
