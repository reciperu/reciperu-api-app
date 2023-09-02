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
} from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags, ApiParam } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UpdateUserDto } from './dto/updateUser.dto';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':uuid')
  @ApiOperation({ operationId: 'getUser' })
  @ApiParam({
    name: 'uuid',
    type: String,
    required: true,
    description: 'user uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully retrieved.',
    type: UserEntity,
  })
  async show(@Param('uuid') uuid: string) {
    try {
      const user = await this.userService.findOneByUuid(uuid);
      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Post()
  @ApiOperation({ operationId: 'createUser' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserEntity,
  })
  async create(@Req() request: Request) {
    try {
      const token = request.headers.authorization.split(' ')[1];
      const user = await this.userService.create(token);
      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Patch(':uuid')
  @ApiOperation({ operationId: 'updateUser' })
  @ApiParam({
    name: 'uuid',
    type: String,
    required: true,
    description: 'user uuid',
  })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
    type: UserEntity,
  })
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      const user = await this.userService.update(uuid, updateUserDto);
      return new UserEntity(user);
    } catch (error) {
      throw new HttpException(
        error.message || 'INTERNAL_SERVER_ERROR',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
