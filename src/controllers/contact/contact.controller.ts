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
import { ContactPresenter, ContactRequestBody } from './contact.presenter';
import { Request } from 'express';

// Slack の Incoming Webhook URL
const webhookUrl = process.env.SLACK_WEBHOOK_URL;

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
    @Body() requestBody: ContactRequestBody,
  ) {
    if (!requestBody.content.length) {
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
        text: `# ユーザー情報\n- ユーザー名：${JSON.stringify(
          req.currentUser.getName,
        )}\n- ユーザーID：${req.currentUser.getUid}\n- メールアドレス: ${
          requestBody.email || 'unknown'
        }\n\n# 問い合わせ内容\n${requestBody.content}`,
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
