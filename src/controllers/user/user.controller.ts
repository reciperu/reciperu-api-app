import {
  Controller,
  Req,
  Get,
  Patch,
  Param,
  Body,
  Delete,
  Inject,
  Put,
  ForbiddenException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserPresenter, UserTokenPresenter } from './user.presenter';
import { UpdateUserDto, UpdateUserTokenDto } from './user.dto';
import {
  UseCaseProxyModule,
  UseCaseProxy,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/use-cases';
import { Request } from 'express';
import { UpdateUserTokenUseCase } from 'src/use-cases/update-user-token.use-case';
import { SuccessPresenter } from '../common/success.presenter';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase>,
    @Inject(UseCaseProxyModule.UPDATE_USER_TOKEN_USE_CASE)
    private readonly updateUserTokenUseCase: UseCaseProxy<UpdateUserTokenUseCase>,
    @Inject(UseCaseProxyModule.DELETE_USER_USE_CASE)
    private readonly deleteUserUseCase: UseCaseProxy<DeleteUserUseCase>,
  ) {}

  @Get('profile')
  @ApiOperation({ operationId: 'getProfile' })
  @ApiResponse({
    status: 200,
    description: 'プロフィール情報取得',
    type: UserPresenter,
  })
  async getProfile(@Req() req: Request) {
    if (!req.currentUser) {
      throw new ForbiddenException('Access to this resource is forbidden');
    }
    return new UserPresenter(req.currentUser);
  }

  @Patch(':id')
  @ApiOperation({ operationId: 'updateUser' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'userId',
  })
  @ApiBody({
    type: UpdateUserDto,
  })
  @ApiResponse({
    status: 200,
    description: 'ユーザーの情報更新',
    type: UserPresenter,
  })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updatedUser = await this.updateUserUseCase
      .getInstance()
      .execute(updateUserDto, id);
    return new UserPresenter(updatedUser);
  }

  @Put('token')
  @ApiOperation({ operationId: 'updateUserToken' })
  @ApiBody({
    type: UpdateUserTokenDto,
  })
  @ApiResponse({
    status: 200,
    description: 'トークンの更新',
    type: UserTokenPresenter,
  })
  async updateToken(
    @Req() req: Request,
    @Body() updateUserTokenDto: UpdateUserTokenDto,
  ) {
    const userToken = await this.updateUserTokenUseCase
      .getInstance()
      .execute(req.currentUser.getId, updateUserTokenDto);
    return new UserTokenPresenter({
      deviceId: userToken.getDeviceId,
      token: userToken.getToken,
    });
  }

  @Delete(':id')
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'userId',
  })
  @ApiResponse({
    status: 204,
    description: 'ユーザー削除',
    type: SuccessPresenter,
  })
  async delete(@Param('id') id: string) {
    await this.deleteUserUseCase.getInstance().execute(id);
    return new SuccessPresenter();
  }
}
