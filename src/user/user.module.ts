import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { FirebaseService } from 'src/firebase/firebase.service';

@Module({
  controllers: [UserController],
  providers: [FirebaseService],
})
export class UserModule {}
