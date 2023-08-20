import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import { FirebaseService } from 'src/firebase/firebase.service';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly firebaseService: FirebaseService) {
    super();
  }
  // HTTP Bearerストラテジがtokenを渡してくれる
  // node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:55で呼び出しされている
  async validate(token: string) {
    try {
      const decodedToken = await this.firebaseService.admin
        .auth()
        .verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
