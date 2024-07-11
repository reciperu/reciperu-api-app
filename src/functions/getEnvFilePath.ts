import { existsSync } from 'fs';
import { resolve } from 'path';

export const getEnvFilePath = (envFilesDirectory: string): string => {
  const env = process.env.NODE_ENV || 'development'; // Default to 'development' if NODE_ENV is not set
  const fileName = `.env.${env}`;
  const filePath = resolve(`${envFilesDirectory}/${fileName}`);
  return existsSync(filePath)
    ? filePath
    : resolve(`${envFilesDirectory}/.env.development`);
};
