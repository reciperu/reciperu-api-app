import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { FirebaseModule } from './firebase/firebase.module';
import { SpaceModule } from './space/space.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, FirebaseModule, SpaceModule],
})
export class AppModule {}
