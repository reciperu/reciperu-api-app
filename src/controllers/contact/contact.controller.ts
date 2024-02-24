import {
  Controller,
  Post,
  Req,
  Body,
  HttpException,
  HttpStatus,
  Inject,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ContactPresenter } from './contact.presenter';
import { Request } from 'express';
import { SendContactDto } from './contact.dto';
import {
  UseCaseProxyModule,
  UseCaseProxy,
  SendContactToSlackUseCase,
} from 'src/use-cases';

@ApiTags('contact')
@ApiBearerAuth()
@Controller('contact')
export class ContactController {
  constructor(
    @Inject(UseCaseProxyModule.SEND_CONTACT_TO_SLACK_USE_CASE)
    private readonly sendContactToSlackUseCase: UseCaseProxy<SendContactToSlackUseCase>,
  ) {}
  @Post()
  @ApiOperation({ operationId: 'send-contact' })
  @ApiResponse({
    status: 200,
    description: '問い合わせ内容を送信する',
    type: ContactPresenter,
  })
  async sendContact(
    @Req() req: Request,
    @Body() sendContactDto: SendContactDto,
  ) {
    // Slack にメッセージを送信
    await this.sendContactToSlackUseCase
      .getInstance()
      .execute(req.currentUser, sendContactDto);

    return new ContactPresenter();
  }
}
