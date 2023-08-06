import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [FirebaseService, PrismaService],
})
export class UserModule {}
