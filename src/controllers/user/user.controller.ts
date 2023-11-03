import {
  Controller,
  Req,
  Get,
  Post,
  Patch,
  HttpException,
  HttpStatus,
  Param,
  Body,
  Delete,
  Inject,
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
} from 'src/use-cases';
import { Request } from 'express';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseProxyModule.CHECK_USER_USE_CASE)
    private readonly createUserUseCase: UseCaseProxy<CheckUserUseCase>,
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
  async getProfile() {
    try {
      // const user = await this.userService.findOneByUuid(uuid);
      // return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
    try {
      // const user = await this.userService.update(uuid, updateUserDto);
      // return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
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
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
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
      await this.createUserUseCase.getInstance().execute(user, token),
    );
  }
  // TODO:退会処理のAPI
}
