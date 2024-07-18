import * as admin from 'firebase-admin';
import { HttpException, Injectable, OnModuleInit } from '@nestjs/common';
import { ServiceAccount } from 'firebase-admin';
import axios from 'axios';
import { randomUUID } from 'crypto';
import firebaseServiceAccount = require('../../../firebase-service-account.json');
import { ConfigService } from '@nestjs/config';

const adminConfig: ServiceAccount = firebaseServiceAccount;
@Injectable()
export class FirebaseService implements OnModuleInit {
  constructor(private readonly configService: ConfigService) {}

  onModuleInit() {
    if (admin.apps.length === 0) {
      admin.initializeApp({
        credential: admin.credential.cert(adminConfig),
        storageBucket: this.configService.get('STORAGE_BUCKET_NAME'),
      });
    }
  }

  get admin() {
    return admin;
  }

  get storage() {
    return this.admin.storage();
  }

  async deleteImageFromStorage(filename: string) {
    const bucket = this.storage.bucket();
    const blob = bucket.file(filename);
    try {
      await blob.delete();
    } catch (error) {
      throw new HttpException(
        `Unable to delete image, something went wrong: ${error}`,
        500,
      );
    }
  }

  async uploadProfileImageToStorage(
    path: 'profile' | 'recipe',
    image: string,
    prevFilename: string,
  ) {
    const bucket = this.storage.bucket();
    let filename = ''; // 画像のファイル名
    let imageUrl = ''; // 画像のURL
    let ext = ''; // 画像の拡張子
    let buffer: Buffer;
    // base64の場合
    if (image.startsWith('data:image')) {
      const base64Image = image.split(';base64,').pop();
      ext = image.split(';')[0].split('/')[1];
      buffer = Buffer.from(base64Image, 'base64');
      filename = `${path}/${randomUUID()}.${ext}`;
    }
    // URLの場合
    if (image.startsWith('http')) {
      const response = await axios.get(image, {
        responseType: 'arraybuffer',
      });
      buffer = Buffer.from(response.data, 'binary');
      ext = response.headers['content-type'].split('/')[1];
      filename = `${path}/${randomUUID()}.${ext}`;
    }
    const blob = bucket.file(filename);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: 'image/' + ext,
      },
    });

    try {
      await new Promise((resolve, reject) => {
        blobStream.on('finish', resolve);
        blobStream.on('error', reject);
        blobStream.end(buffer);
      });

      const downloadURL = await blob.getSignedUrl({
        action: 'read',
        expires: '01-01-2099', // 有効期限を実質無期限で設定
      });

      imageUrl = downloadURL[0];

      // 元の画像を削除
      if (prevFilename?.length) {
        // 削除エラーは無視
        try {
          await this.deleteImageFromStorage(prevFilename);
        } catch (err) {
          console.error('Failed to delete image', err);
        }
      }
    } catch (error) {
      throw new HttpException(
        `Unable to upload image, something went wrong: ${error}`,
        500,
      );
    }
    return {
      filename,
      imageUrl,
    };
  }
}
