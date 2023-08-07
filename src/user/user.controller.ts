import { Controller, Req, Post } from '@nestjs/common';
import { Request } from 'express';
import { UserService } from './user.service';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  @ApiOperation({ operationId: 'createUser' })
  async create(@Req() request: Request) {
    const token = request.headers.authorization.split(' ')[1];
    await this.userService.create(token);
    return;
  }
}
