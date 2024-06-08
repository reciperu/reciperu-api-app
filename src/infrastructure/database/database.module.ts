import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaSpaceRepository,
  PrismaRecipeRepository,
  PrismaUserRepository,
  PrismaSpaceInvitationRepository,
  PrismaMenuRepository,
  PrismaRequestedRecipeRepository,
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
  ],
  exports: [
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaSpaceRepository,
    PrismaSpaceInvitationRepository,
    PrismaMenuRepository,
    PrismaRequestedRecipeRepository,
    PrismaTransactionManager,
  ],
})
export class DatabaseModule {}
