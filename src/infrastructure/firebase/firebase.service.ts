import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import firebaseServiceAccount = require('../../../firebase-service-account.json');
import { ConfigService } from '@nestjs/config';
const adminConfig: ServiceAccount = firebaseServiceAccount;
@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    const storageBucket = this.configService.get('STORAGE_BUCKET_NAME');
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        storageBucket,
      });
    }
  }

  get admin() {
    return admin;
  }
}
