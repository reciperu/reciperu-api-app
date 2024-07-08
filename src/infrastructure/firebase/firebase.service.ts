import * as admin from 'firebase-admin';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import firebaseServiceAccount = require('../../../firebase-service-account.json');
import { ConfigService } from '@nestjs/config';
import * as functions from 'firebase-functions';

const adminConfig: ServiceAccount = firebaseServiceAccount;
@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        storageBucket: this.getStorage(),
      });
    }
  }

  get admin() {
    return admin;
  }

  private getStorage() {
    if (process.env.NODE_ENV === 'local') {
      return this.configService.get('STORAGE_BUCKET_NAME');
    }
    return functions.config().env.storage_bucket_name;
  }
}
