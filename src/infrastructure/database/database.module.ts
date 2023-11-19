import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaRecipeRepository, PrismaUserRepository } from './prisma';

@Module({
  providers: [PrismaService, PrismaUserRepository, PrismaRecipeRepository],
  exports: [PrismaUserRepository, PrismaRecipeRepository],
})
export class DatabaseModule {}
