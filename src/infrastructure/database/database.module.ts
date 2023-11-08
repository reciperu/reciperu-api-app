import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaRecipeRepository,
  PrismaSpaceRepository,
  PrismaUserRepository,
} from './prisma';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaSpaceRepository,
    PrismaRecipeRepository,
  ],
  exports: [
    PrismaUserRepository,
    PrismaSpaceRepository,
    PrismaRecipeRepository,
  ],
})
export class DatabaseModule {}
