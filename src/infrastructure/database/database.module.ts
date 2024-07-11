import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaSpaceRepository,
  PrismaRecipeRepository,
  PrismaUserRepository,
  PrismaSpaceInvitationRepository,
  PrismaMenuRepository,
  PrismaRequestedRecipeRepository,
  PrismaUserTokenRepository,
} from './prisma';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaSpaceRepository,
    PrismaSpaceInvitationRepository,
    PrismaMenuRepository,
    PrismaRequestedRecipeRepository,
    PrismaUserTokenRepository,
  ],
  exports: [
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaSpaceRepository,
    PrismaSpaceInvitationRepository,
    PrismaMenuRepository,
    PrismaRequestedRecipeRepository,
    PrismaUserTokenRepository,
  ],
})
export class DatabaseModule {}
