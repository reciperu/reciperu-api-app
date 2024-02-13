import {
  Controller,
  Post,
  Req,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { ContactPresenter } from './contact.presenter';
import { Request } from 'express';
import { CreateContactDto } from './contact.dto';

// Slack の Incoming Webhook URL
const webhookUrl =
  'https://hooks.slack.com/services/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';

@ApiTags('contact')
@ApiBearerAuth()
@Controller('contact')
export class ContactController {
  @Post()
  @ApiOperation({ operationId: 'contact' })
  @ApiResponse({
    status: 200,
    description: '問い合わせ内容を送信する',
    type: ContactPresenter,
  })
  async postContact(
    @Req() req: Request,
    @Body() createContactDto: CreateContactDto,
  ) {
    if (!createContactDto.content.length) {
      // 400エラーを返す
      throw new HttpException('No message provided', HttpStatus.BAD_REQUEST);
    }
    // Slack にメッセージを送信
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `# ユーザー情報\n- ユーザー名：${
          req.currentUser.getName
        }\n- ユーザーID：${req.currentUser.getId}\n- メールアドレス: ${
          createContactDto.email || 'unknown'
        }\n\n# 問い合わせ内容\n${createContactDto.content}`,
      }),
    });

    if (!response.ok) {
      throw new HttpException(
        `Error sending message: ${response.statusText}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return { success: true };
  }
}
