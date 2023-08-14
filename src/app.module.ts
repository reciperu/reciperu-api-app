import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';

import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [UserModule, AuthModule, PrismaModule, FirebaseModule],
})
export class AppModule {}
