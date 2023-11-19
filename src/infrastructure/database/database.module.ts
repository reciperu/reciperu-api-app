import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import {
  PrismaRecipeBookRepository,
  PrismaRecipeRepository,
  PrismaUserRepository,
} from './prisma';

@Module({
  providers: [
    PrismaService,
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaRecipeBookRepository,
  ],
  exports: [
    PrismaUserRepository,
    PrismaRecipeRepository,
    PrismaRecipeBookRepository,
  ],
})
export class DatabaseModule {}
