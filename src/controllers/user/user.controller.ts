import {
  Controller,
  Req,
  Get,
  Post,
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
  CheckUserUseCase,
  UpdateUserUseCase,
} from 'src/use-cases';
import { Request } from 'express';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseProxyModule.CHECK_USER_USE_CASE)
    private readonly checkUserUseCase: UseCaseProxy<CheckUserUseCase>,
    @Inject(UseCaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase>,
  ) {}

  @Get()
  @ApiOperation({ operationId: 'getUserList' })
  @ApiResponse({
    status: 200,
    description: 'ユーザー一覧取得',
    type: UserPresenter,
    isArray: true,
  })
  async index() {
    console.log('index');
  }

  @Get('profile')
  @ApiBearerAuth()
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
  })
  async delete(@Param('id') id: string) {
    try {
      // await this.userService.delete(uuid);
    } catch (error) {
      // throw new HttpException(
      //   error.message || 'INTERNAL_SERVER_ERROR',
      //   error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      // );
    }
  }

  @ApiOperation({ operationId: 'checkUser' })
  @Post('check')
  @ApiResponse({
    status: 200,
    description: 'ユーザー情報のチェック',
    type: UserPresenter,
  })
  async check(@Req() req: Request) {
    const user = req.currentUser;
    const token = req.headers.authorization.split(' ')[1];
    return new UserPresenter(
      await this.checkUserUseCase.getInstance().execute(user, token),
    );
  }
  // TODO:退会処理のAPI
}
