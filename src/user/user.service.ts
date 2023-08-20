import { Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { SupabaseService } from 'src/supabase/supabase.service';

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}
  async create(token: string) {
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);

    const user = await this.prismaService.user.create({
      data: {
        name: decodedToken.name,
        imageUrl: decodedToken.imageUrl || '',
        uid: decodedToken.uid,
      },
    });
    return user;
  }
  async creteWithIdToken(token: string) {
    const res = await this.supabaseService.client.auth.signInWithIdToken({
      provider: 'google',
      token: token,
    });
  }
}
