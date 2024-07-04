import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { User } from 'src/domain';
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
      const user = await this.prismUserRepository.findUser({
        uid: decodedToken.uid,
      });

      req.currentUser = user
        ? new User({
            id: user.getId,
            name: user.getName,
            imageUrl: user.getImageUrl,
            filename: user.getFilename,
            uid: user.getUid,
            activeStatus: user.getActiveStatus,
            spaceId: user.getSpaceId,
            spaceRole: user.getSpaceRole,
          })
        : null;

      next();
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
