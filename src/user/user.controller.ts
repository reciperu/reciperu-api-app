import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { Public } from 'src/auth/decorators/public.decorator';
import { Request } from 'express';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';

// あとで修正
@Controller('users')
export class UserController {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prismaService: PrismaService,
  ) {}
  @Public()
  @Get()
  getHello() {
    return 'Hello World!';
  }

  @Public()
  @Post()
  async createUser(@Body() body: { name: string; imageUrl: string }) {
    const user = await this.prismaService.user.create({
      data: {
        name: body.name,
        imageUrl: body.imageUrl,
        isOwner: false,
        uuid: 'uuid',
        spaceId: undefined,
      },
    });
    return user;
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
