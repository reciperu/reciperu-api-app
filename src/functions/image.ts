import { Storage } from 'firebase-admin/lib/storage/storage';
import axios from 'axios';
import { randomUUID } from 'crypto';
import { HttpException } from '@nestjs/common';

export const uploadImageToStorage = async (
  storage: Storage,
  image: string,
  prevFilename: string,
) => {
  const bucket = storage.bucket();
  let filename = ''; // 画像のファイル名
  let imageUrl = ''; // 画像のURL
  let ext = ''; // 画像の拡張子
  let buffer: Buffer;
  // base64の場合
  if (image.startsWith('data:image')) {
    const base64Image = image.split(';base64,').pop();
    ext = image.split(';')[0].split('/')[1];
    buffer = Buffer.from(base64Image, 'base64');
    filename = `profile/${randomUUID()}.${ext}`;
  }
  // URLの場合
  if (image.startsWith('http')) {
    const response = await axios.get(image, {
      responseType: 'arraybuffer',
    });
    buffer = Buffer.from(response.data, 'binary');
    ext = response.headers['content-type'].split('/')[1];
    filename = `profile/${randomUUID()}.${ext}`;
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
      const prevBlob = bucket.file(prevFilename);
      await prevBlob.delete();
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
};
