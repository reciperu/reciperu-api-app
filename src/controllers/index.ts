import { Module } from '@nestjs/common';
import { UserController } from './user';
import { RecipeBookController } from './recipe-book';
import { RecipeController } from './recipe';
import { InvitationController } from './invitation';
import { MenuController } from './menu';
import { UseCaseProxyModule } from 'src/use-cases/use-case.module';

@Module({
  controllers: [
    UserController,
    RecipeController,
    RecipeBookController,
    InvitationController,
    MenuController,
  ],
  imports: [UseCaseProxyModule.resister()],
})
export class ControllersModule {}
