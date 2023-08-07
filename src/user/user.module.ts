import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [FirebaseService, PrismaService, UserService],
})
export class UserModule {}
