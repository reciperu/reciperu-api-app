import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/database/prisma/prisma.service';
import {
  ISpaceInvitationRepository,
  SpaceInvitationBeforePersist,
  SpaceInvitation,
} from 'src/domain';
import { SpaceInvitation as PrismaInvitation } from '@prisma/client';

@Injectable()
export class PrismaSpaceInvitationRepository
  implements ISpaceInvitationRepository
{
  constructor(private readonly prismaService: PrismaService) {
    this.prismaService = prismaService;
  }

  async save(
    spaceInvitation: SpaceInvitation | SpaceInvitationBeforePersist,
  ): Promise<SpaceInvitation> {
    const prismaInvitation = await this.prismaService.spaceInvitation.upsert({
      where: {
        token: 'token' in spaceInvitation ? spaceInvitation.getToken : '',
      },
      create: {
        token: spaceInvitation.getToken,
        expiredAt: spaceInvitation.getExpiredAt,
        spaceId: spaceInvitation.getSpaceId,
        usedAt: null,
      },
      update: {
        token: spaceInvitation.getToken,
        expiredAt: spaceInvitation.getExpiredAt,
        spaceId: spaceInvitation.getSpaceId,
        usedAt: 'usedAt' in spaceInvitation ? spaceInvitation.getUsedAt : null,
      },
    });

    return this.toSpaceInvitation(prismaInvitation);
  }

  async findSpaceInvitation(token: string): Promise<SpaceInvitation | null> {
    const prismaInvitation =
      await this.prismaService.spaceInvitation.findUnique({
        where: {
          token,
        },
      });
    if (!prismaInvitation) {
      return null;
    }
    return this.toSpaceInvitation(prismaInvitation);
  }

  private toSpaceInvitation(prismaInvitation: PrismaInvitation) {
    return new SpaceInvitation({
      token: prismaInvitation.token,
      expiredAt: prismaInvitation.expiredAt,
      usedAt: prismaInvitation.usedAt,
      spaceId: prismaInvitation.spaceId,
    });
  }
}
