import { Injectable } from '@nestjs/common';
import { UpdateUserTokenDto } from 'src/controllers/user';
import {
  IUserTokenRepository,
  UserToken,
  UserTokenBeforePersist,
} from 'src/domain';

@Injectable()
export class UpdateUserTokenUseCase {
  constructor(private readonly userTokenRepository: IUserTokenRepository) {}
  async execute(
    userId: number,
    updateUserDto: UpdateUserTokenDto,
  ): Promise<UserToken> {
    const userToken = await this.userTokenRepository.findUserToken(
      userId,
      updateUserDto.deviceId,
    );
    // userTokenがない場合は作成
    if (!userToken) {
      return await this.userTokenRepository.save(
        new UserTokenBeforePersist({
          userId,
          deviceId: updateUserDto.deviceId,
          token: updateUserDto.token,
        }),
      );
    }
    // userTokenがある場合は更新
    userToken.update(updateUserDto.token);
    return await this.userTokenRepository.save(userToken);
  }
}
