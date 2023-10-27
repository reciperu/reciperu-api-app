import { Module } from '@nestjs/common';
import { CreateUserUseCase } from './create-user.use-case';
import { DatabaseModule } from 'src/infrastructure/database/database.module';
import { FirebaseModule } from 'src/infrastructure/firebase/firebase.module';

@Module({
  imports: [DatabaseModule, FirebaseModule],
  providers: [CreateUserUseCase],
  exports: [CreateUserUseCase],
})
export class UseCaseModule {}
