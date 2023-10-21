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
} from '@nestjs/common';
import { Request } from 'express';
// import { UserService } from '../../user/user.service';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
// import { UserEntity } from '../../user/entities/user.entity';
import { UserPresenter } from './user.presenter';
import { CreateUserDto, UpdateUserDto } from './dto';

@ApiTags('user')
@Controller('users')
export class UserController {
  // constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({ operationId: 'getUserList' })
  @ApiResponse({
    status: 200,
    description: 'ユーザー一覧取得',
    type: UserPresenter,
    isArray: true,
  })
  async index() {
    try {
    } catch (error) {
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Get(':id')
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
  async create(@Req() request: Request) {
    try {
      // const token = request.headers.authorization.split(' ')[1];
      // const user = await this.userService.create(token);
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
}
