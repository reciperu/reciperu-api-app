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
        storageBucket: 'gs://reciperu-dev-app.appspot.com',
      });
    }
  }

  get admin() {
    return admin;
  }

  uploadFile = async (file: Express.Multer.File): Promise<string> => {
    const bucket = admin.storage().bucket();
    const fileUpload = bucket.file(`images/${file.originalname}`);
    const blobStream = fileUpload.createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    return new Promise((resolve, reject) => {
      blobStream.on('finish', () => {
        const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${
          bucket.name
        }/o/${encodeURI(fileUpload.name)}?alt=media`;
        resolve(publicUrl);
      });
      blobStream.on('error', (error) => {
        reject(`Unable to upload image, something went wrong`);
      });
      blobStream.end(file.buffer);
    });
  };
}
