import { Module } from '@nestjs/common';
import { SpaceService } from './space.service';
import { SpaceController } from './space.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from 'src/user/user.service';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  providers: [SpaceService, PrismaService, UserService, FirebaseService],
  controllers: [SpaceController],
})
export class SpaceModule {}
