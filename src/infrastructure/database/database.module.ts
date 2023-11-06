import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaSpaceRepository, PrismaUserRepository } from './prisma';

@Module({
  providers: [PrismaService, PrismaUserRepository, PrismaSpaceRepository],
  exports: [PrismaUserRepository, PrismaSpaceRepository],
})
export class DatabaseModule {}
