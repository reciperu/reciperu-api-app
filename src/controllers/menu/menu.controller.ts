import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { MenuPresenter } from './menu.presenter';
import { CreateMenuDto, UpdateMenuDto } from './dto';

@ApiTags('menus')
@Controller('menus')
export class MenuController {
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
  async create() {
    try {
    } catch (error) {}
  }

  @Put(':id')
  @ApiOperation({ operationId: 'updateMenu' })
  @ApiBody({ type: UpdateMenuDto })
  @ApiResponse({
    status: 200,
    description: '献立の更新',
    type: MenuPresenter,
  })
  async update() {
    try {
    } catch (error) {}
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
