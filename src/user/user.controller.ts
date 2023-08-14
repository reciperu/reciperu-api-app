import { Controller, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';

@ApiTags('user')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiOperation({ operationId: 'createUser' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
    type: UserEntity,
  })
  async create(@Req() request: Request) {
    const token = request.headers.authorization.split(' ')[1];
    const user = await this.userService.create(token);
    return new UserEntity(user);
  }
}
