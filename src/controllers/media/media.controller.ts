import { Post, Controller } from '@nestjs/common';
import {
  ApiBody,
  ApiOperation,
  ApiResponse,
  ApiConsumes,
  ApiTags,
} from '@nestjs/swagger';
import { UploadFilesDto } from './dto';
import { MediaPresenter } from './media.presenter';

@ApiTags('media')
@Controller('media')
export class MediaController {
  @Post('image')
  @ApiOperation({ operationId: 'uploadImage' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    type: UploadFilesDto,
  })
  @ApiResponse({
    status: 200,
    description: '画像のアップロード',
    type: MediaPresenter,
  })
  async uploadImage() {
    try {
    } catch (error) {}
  }
}
