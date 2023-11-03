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
import { Request } from 'express';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserPresenter } from './user.presenter';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { CreateUserUseCase } from 'src/use-cases/create-user.use-case';
import {
  UseCaseProxyModule,
  UseCaseProxy,
} from 'src/use-cases/use-case.module';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseProxyModule.CREATE_USER_USE_CASE)
    private readonly createUserUseCase: UseCaseProxy<CreateUserUseCase>,
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

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ operationId: 'getUser' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
    description: 'userId',
  })
  @ApiResponse({
    status: 200,
    description: 'ユーザー詳細取得',
    type: UserPresenter,
  })
  async show(@Param('id') id: string) {
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

  @Post()
  @ApiOperation({ operationId: 'createUser' })
  @ApiBody({
    type: CreateUserDto,
  })
  @ApiResponse({
    status: 201,
    description: 'ユーザー登録',
    type: UserPresenter,
  })
  async create(@Req() request: Request, @Body() createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase
      .getInstance()
      .execute(createUserDto, request.headers.authorization.split(' ')[1]);
    return new UserPresenter(user);
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
  async check() {
    // TODO: implement
  }
}
