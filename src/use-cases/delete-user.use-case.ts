import { Injectable } from '@nestjs/common';
import {
  IUserRepository,
  ISpaceRepository,
  User,
  IRecipeRepository,
  Recipe,
  ITransactionManager,
} from 'src/domain';
import { BadRequestException } from 'src/infrastructure/exceptions';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class DeleteUserUseCase {
  constructor(
    private readonly spaceRepository: ISpaceRepository,
    private readonly userRepository: IUserRepository,
    private readonly firebaseService: FirebaseService,
    private readonly recipeRepository: IRecipeRepository,
    private readonly transactionManager: ITransactionManager,
  ) {}
  async execute(userId: string) {
    console.log(userId);
    await this.transactionManager.begin(async () => {
      const user = await this.userRepository.findUser({
        userId,
      });
      // await this.change.paceOfParticipantsIfMySpace(user);
      // user.update({
      //   name: '削除済みユーザー',
      // });

      const space = await this.spaceRepository.findSpace(user.getSpaceId);
      console.log(user, 'user');
      // await this.firebaseService.admin.auth().deleteUser(user.getUid);
    });

    console.log('delete user');

    // await this.spaceRepository.deleteSpace(user.getSpaceId);
  }

  private async changeSpaceOfParticipantsIfMySpace(user: User) {
    const isMySpace = user.getSpaceId === user.getMySpaceId;
    if (!isMySpace) return;

    const participants = await this.findParticipants(user.getSpaceId);

    await this.changeSpaceOfParticipantRecipes(participants, user);

    await Promise.all(
      participants.map((participant) => {
        participant.changeSpace(user.getMySpaceId);
        this.userRepository.update(participant);
      }),
    );
  }

  private async changeSpaceOfParticipantRecipes(
    participants: User[],
    user: User,
  ) {
    const recipes = await this.recipeRepository.findRecipes(user.getSpaceId, {
      userId: user.getId,
    });

    const recipesByUserId: {
      [key: string]: Recipe[];
    } = {};
    recipes.forEach((recipe) => {
      const useId = recipe.getUserId;
      if (!recipesByUserId[useId]) {
        recipesByUserId[useId] = [];
      }
      recipesByUserId[useId].push(recipe);
    });

    participants.map(async (participant) => {
      const recipes = recipesByUserId[participant.getId];
      if (!recipes) return;
      // TODO:トランザクション処理
      await Promise.all(
        recipes.map((recipe) => {
          recipe.setSpaceId = participant.getMySpaceId;
          this.recipeRepository.save(recipe);
        }),
      );
    });
  }

  private async findParticipants(spaceId: string) {
    const users = await this.userRepository.findUsersBySpaceId(spaceId);
    if (!users) {
      throw new BadRequestException();
    }

    return users.filter((user) => user.getSpaceId !== user.getMySpaceId);
  }
}
