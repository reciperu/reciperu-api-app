import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import firebaseServiceAccount = require('../../firebase-service-account.json');
const adminConfig: ServiceAccount = firebaseServiceAccount;
@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    admin.initializeApp({
      credential: admin.credential.cert(adminConfig),
    });
  }

  get admin() {
    return admin;
  }
}
