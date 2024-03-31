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
  UploadedFile,
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
} from 'src/use-cases';
import {
  FileInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { Request } from 'express';

@ApiTags('user')
@ApiBearerAuth()
@Controller('users')
export class UserController {
  constructor(
    @Inject(UseCaseProxyModule.UPDATE_USER_USE_CASE)
    private readonly updateUserUseCase: UseCaseProxy<UpdateUserUseCase>,
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
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    console.log(file);
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

  // TODO:退会処理のAPI
}
