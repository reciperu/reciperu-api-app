import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaRecipeBookRepository,
  PrismaRecipeRepository,
  PrismaUserRepository,
  PrismaRecipeBookInvitationRepository,
} from './prisma';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaRecipeBookRepository,
    PrismaRecipeBookInvitationRepository,
  ],
  exports: [
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaRecipeBookRepository,
    PrismaRecipeBookInvitationRepository,
  ],
})
export class DatabaseModule {}
