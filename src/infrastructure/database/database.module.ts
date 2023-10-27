import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaUserRepository } from './prisma/repositories/prisma.user.repository';
import { IUserRepository } from 'src/domain/repositories';

@Module({
  providers: [
    PrismaService,
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
  exports: [
    {
      provide: IUserRepository,
      useClass: PrismaUserRepository,
    },
  ],
})
export class DatabaseModule {}
