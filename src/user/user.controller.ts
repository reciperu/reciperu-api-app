import { Controller, Get, Req } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Request } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';

// あとで修正
@Controller('users')
export class UserController {
  constructor(private readonly firebaseService: FirebaseService) {}
  @Public()
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Get('auth')
  async getAuth(@Req() request: Request) {
    const token = request.headers.authorization.split(' ')[1];
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);
    console.log(decodedToken.name);
    return 'Auth OK!';
  }
}
