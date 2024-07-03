import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import firebaseServiceAccount = require('../../../firebase-service-account.json');
const adminConfig: ServiceAccount = firebaseServiceAccount;
@Injectable()
export class FirebaseService implements OnModuleInit {
  onModuleInit() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        storageBucket: process.env.STORAGE_BUCKET_NAME,
      });
    }
  }

  get admin() {
    return admin;
  }
}
