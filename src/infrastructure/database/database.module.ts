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
import { PrismaTransactionManager } from './prisma/prisma.transaction-manager';

@Module({
  providers: [
    PrismaService,
    PrismaTransactionManager,
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
    PrismaTransactionManager,
  ],
})
export class DatabaseModule {}
