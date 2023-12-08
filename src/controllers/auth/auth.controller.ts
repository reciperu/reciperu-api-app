import { Controller, Req, Inject, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { UserPresenter } from '../user';
import { UseCaseProxyModule, UseCaseProxy, LoginUseCase } from 'src/use-cases';
import { Request } from 'express';

@ApiTags('auth')
@ApiBearerAuth()
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(UseCaseProxyModule.LOGIN_USE_CASE)
    private readonly loginUseCase: UseCaseProxy<LoginUseCase>,
  ) {}

  @Post()
  @ApiOperation({ operationId: 'login' })
  @ApiResponse({
    status: 201,
    description: 'ログイン',
    type: UserPresenter,
  })
  async login(@Req() req: Request) {
    const user = req.currentUser;
    const token = req.headers.authorization.split(' ')[1];
    return new UserPresenter(
      await this.loginUseCase.getInstance().execute(user, token),
    );
  }
}
