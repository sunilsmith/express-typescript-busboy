import * as dotenv from 'dotenv';
dotenv.config();

const {
  FILE_SIZE,
} = process.env;

export const fileSize = FILE_SIZE || '';
