import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { FirebaseService } from 'src/firebase/firebase.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from './dto/updateUser.dto';
import { SupabaseService } from 'src/supabase/supabase.service';
import { StorageClient } from '@supabase/storage-js';
// import { StorageClient } from '@supabase/storage-js';

// const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
// )

@Injectable()
export class UserService {
  constructor(
    private readonly firebaseService: FirebaseService,
    private readonly prismaService: PrismaService,
    private readonly supabaseService: SupabaseService,
  ) {}
  async findOneByUuid(uuid: string) {
    const user = await this.prismaService.user.findUnique({
      where: {
        uuid,
      },
    });
    if (!user) {
      throw new HttpException('USER_NOT_FOUND', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async create(token: string) {
    const decodedToken = await this.firebaseService.admin
      .auth()
      .verifyIdToken(token);

    const user = await this.prismaService.user.findUnique({
      where: {
        uid: decodedToken.uid,
      },
    });
    if (user) {
      throw new HttpException('USER_ALREADY_EXISTS', HttpStatus.BAD_REQUEST);
    }

    const newUser = await this.prismaService.user.create({
      data: {
        name: decodedToken.name as string,
        imageUrl: (decodedToken.imageUrl as string) || '',
        uid: decodedToken.uid,
      },
    });
    return newUser;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    return await this.prismaService.user.update({
      where: {
        uuid,
      },
      data: {
        ...updateUserDto,
      },
    });
  }

  async uploadImage(uuid: string, image: Express.Multer.File) {
    const STORAGE_URL = 'http://localhost:54324/storage/v1/object/public';
    const SERVICE_KEY =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU';
    //! service key, not anon key

    const storageClient = new StorageClient(STORAGE_URL, {
      apikey: SERVICE_KEY,
      Authorization: `Bearer ${SERVICE_KEY}`,
    });
    console.log(image.buffer);

    const imageUrl = await storageClient
      .from('sample')
      .upload('image/image2.jpg', image.stream);

    console.log('imageUrl', imageUrl);
  }
}
