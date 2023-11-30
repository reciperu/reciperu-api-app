import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { MenuPresenter } from './menu.presenter';
import { CreateMenuDto, UpdateMenuDto } from './menu.dto';
import {
  UseCaseProxyModule,
  CreateMenuUseCase,
  UseCaseProxy,
  UpdateMenuUseCase,
} from 'src/use-cases';
import { Request } from 'express';

@ApiTags('menus')
@ApiBearerAuth()
@Controller('menus')
export class MenuController {
  constructor(
    @Inject(UseCaseProxyModule.CREATE_MENU_USE_CASE)
    private readonly createMenuUseCase: UseCaseProxy<CreateMenuUseCase>,
    @Inject(UseCaseProxyModule.UPDATE_MENU_USE_CASE)
    private readonly updateMenuUseCase: UseCaseProxy<UpdateMenuUseCase>,
  ) {}
  @Get()
  @ApiOperation({ operationId: 'getMenu' })
  @ApiResponse({
    status: 200,
    description: '献立ー一覧取得',
    type: MenuPresenter,
    isArray: true,
  })
  async index() {
    try {
    } catch (error) {}
  }

  @Get('pending')
  @ApiOperation({ operationId: 'getPendingMenu' })
  @ApiResponse({
    status: 200,
    description: '提案メニュー一覧取得',
    type: MenuPresenter,
    isArray: true,
  })
  async getPendingMenus() {
    try {
    } catch (error) {}
  }

  @Post()
  @ApiOperation({ operationId: 'createMenu' })
  @ApiBody({ type: CreateMenuDto })
  @ApiResponse({
    status: 200,
    description: '献立の作成',
    type: MenuPresenter,
  })
  async create(@Req() req: Request, @Body() createMenuDto: CreateMenuDto) {
    return new MenuPresenter(
      await this.createMenuUseCase
        .getInstance()
        .execute(createMenuDto, req.currentUser.getId),
    );
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateMenu' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({
    status: 200,
    description: '献立の更新',
    type: MenuPresenter,
  })
  async update(@Param('id') id: string, @Body() updateMenuDto: UpdateMenuDto) {
    return new MenuPresenter(
      await this.updateMenuUseCase.getInstance().execute(id, updateMenuDto),
    );
  }

  @Delete(':id')
  @ApiOperation({ operationId: 'deleteMenu' })
  @ApiResponse({
    status: 200,
    description: '献立の削除',
  })
  async delete() {
    try {
    } catch (error) {}
  }
}
