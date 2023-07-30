import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';
import * as admin from 'firebase-admin';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super();
  }
  // HTTP Bearerストラテジがtokenを渡してくれる
  // node_modules/@nestjs/passport/dist/passport/passport.strategy.js:11:55で呼び出しされている
  async validate(token: string) {
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      return decodedToken;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
