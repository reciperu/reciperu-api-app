import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { FirebaseStrategy } from './ firebase-auth.strategy';
import { FirebaseAuthGuard } from './ firebase-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  imports: [PassportModule],
  providers: [
    FirebaseStrategy,
    {
      provide: APP_GUARD,
      useClass: FirebaseAuthGuard,
    },
    FirebaseService,
  ],
})
export class AuthModule {}
