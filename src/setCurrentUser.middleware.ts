// import { HttpException, Injectable, NestMiddleware } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';
// import { PrismaService } from './prisma/prisma.service';
// import { FirebaseService } from './firebase/firebase.service';
// @Injectable()
// export class SetCurrentUserMiddleware implements NestMiddleware {
//   constructor(
//     private readonly prismService: PrismaService,
//     private readonly firebaseService: FirebaseService,
//   ) {}
//   async use(req: Request, res: Response, next: NextFunction) {
//     try {
//       const token = req.headers.authorization.split(' ')[1];
//       const decodedToken = await this.firebaseService.admin
//         .auth()
//         .verifyIdToken(token);
//       req['currentUser'] = await this.prismService.user.findUnique({
//         where: { uid: decodedToken.uid },
//       });
//       next();
//     } catch (error) {
//       throw new HttpException(error, 401);
//     }
//   }
// }
