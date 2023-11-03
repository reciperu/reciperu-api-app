import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaUserRepository } from 'src/infrastructure/database/prisma/repositories/prisma.user.repository';
import { FirebaseService } from 'src/infrastructure/firebase/firebase.service';

@Injectable()
export class SetCurrentUserMiddleware implements NestMiddleware {
  constructor(
    private readonly prismUserRepository: PrismaUserRepository,
    private readonly firebaseService: FirebaseService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = await this.firebaseService.admin
        .auth()
        .verifyIdToken(token);
      req.currentUser = await this.prismUserRepository.findUnique(
        decodedToken.uid,
      );
      next();
    } catch (error) {
      throw new HttpException(error, 401);
    }
  }
}
