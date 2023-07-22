import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import firebaseServiceAccount = require('../firebase-service-account.json');

const adminConfig: ServiceAccount = firebaseServiceAccount;
export const initializeFirebaseAdmin = () =>
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });
