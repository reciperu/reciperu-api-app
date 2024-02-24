import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { SendContactDto, User } from 'src/domain';

@Injectable()
export class SendContactToSlackUseCase {
  async execute(user: User, sendContactDto: SendContactDto) {
    const response = await fetch(process.env.SLACK_WEBHOOK_URL, {
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
