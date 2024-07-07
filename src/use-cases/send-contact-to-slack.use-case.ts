import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SendContactDto, User } from 'src/domain';

@Injectable()
export class SendContactToSlackUseCase {
  constructor(private readonly configService: ConfigService) {}

  async execute(user: User, sendContactDto: SendContactDto) {
    if (!sendContactDto.content.length) {
      // 400エラーを返す
      throw new HttpException('No message provided', HttpStatus.BAD_REQUEST);
    }
    const slackWebhookUrl = this.configService.get('SLACK_WEBHOOK_URL');
    const response = await fetch(slackWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text: `# ユーザー情報\n- ユーザー名：${user.getName}\n- ユーザーID：${
          user.getId
        }\n- メールアドレス: ${
          sendContactDto.email || 'unknown'
        }\n\n# 問い合わせ内容\n${sendContactDto.content}`,
      }),
    });

    if (!response.ok) {
      throw new HttpException(
        `Error sending message: ${response.statusText}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
