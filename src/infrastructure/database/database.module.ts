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

@Module({
  providers: [
    PrismaService,
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
  ],
})
export class DatabaseModule {}
