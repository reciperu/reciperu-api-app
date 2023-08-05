import { Controller, Get, UseGuards } from '@nestjs/common';
import { FirebaseAuthGuard } from 'src/auth/ firebase-auth.guard';
import { Public } from 'src/auth/decorators/public.decorator';

// あとで修正
@Controller('user')
export class UserController {
  @Public()
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @UseGuards(FirebaseAuthGuard)
  @Get('auth')
  getAuth() {
    return 'Auth OK!';
  }
}
