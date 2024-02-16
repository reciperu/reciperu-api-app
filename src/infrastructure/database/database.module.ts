import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaSpaceRepository,
  PrismaRecipeRepository,
  PrismaUserRepository,
  PrismaSpaceInvitationRepository,
} from './prisma';
import { PrismaMenuRepository } from './prisma/repositories/prisma.menu.repository';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaSpaceRepository,
    PrismaSpaceInvitationRepository,
    PrismaMenuRepository,
  ],
  exports: [
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaSpaceRepository,
    PrismaSpaceInvitationRepository,
    PrismaMenuRepository,
  ],
})
export class DatabaseModule {}
