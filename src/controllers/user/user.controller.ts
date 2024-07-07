import {
  Controller,
  Req,
  Get,
  Patch,
  Param,
  Body,
  Delete,
  Inject,
  BadRequestException,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserPresenter } from './user.presenter';
import { UpdateUserDto } from './user.dto';
import {
  UseCaseProxyModule,
  UseCaseProxy,
  UpdateUserUseCase,
  DeleteUserUseCase,
} from 'src/use-cases';
import { Request } from 'express';
import { SuccessPresenter } from '../common/success.presenter';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase>,
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
    return req.currentUser
      ? new UserPresenter(req.currentUser)
      : new BadRequestException();
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
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const updatedUser = await this.updateUserUseCase
      .getInstance()
      .execute(updateUserDto, id);
    return new UserPresenter(updatedUser);
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
