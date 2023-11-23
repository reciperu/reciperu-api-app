import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaRecipeBookRepository,
  PrismaRecipeRepository,
  PrismaUserRepository,
  PrismaRecipeBookInvitationRepository,
} from './prisma';
import { PrismaMenuRepository } from './prisma/repositories/prisma.menu.repository';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaRecipeBookRepository,
    PrismaRecipeBookInvitationRepository,
    PrismaMenuRepository,
  ],
  exports: [
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaRecipeBookRepository,
    PrismaRecipeBookInvitationRepository,
    PrismaMenuRepository,
  ],
})
export class DatabaseModule {}
