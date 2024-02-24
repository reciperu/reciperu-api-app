import { Module } from '@nestjs/common';
import { UserController } from './user';
import { SpaceController } from './space';
import { RecipeController } from './recipe';
import { MenuController } from './menu';
import { UseCaseProxyModule } from 'src/use-cases/use-case.module';
import { AuthController } from './auth/auth.controller';
import { RoadmapController } from './roadmap';
import { ContactController } from './contact';

@Module({
  controllers: [
    UserController,
    RecipeController,
    SpaceController,
    MenuController,
    AuthController,
    RoadmapController,
    ContactController,
  ],
  imports: [UseCaseProxyModule.resister()],
})
export class ControllersModule {}
