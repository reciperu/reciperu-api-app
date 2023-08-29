import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserService } from './user.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Module({
  controllers: [UserController],
  providers: [FirebaseService, PrismaService, UserService, SupabaseService],
})
export class UserModule {}
