import { app, BrowserWindow } from 'electron';
import path from 'path';
import fs from 'fs';
import { createThumbnail } from './thumbnails';
import Store from 'electron-store';
import uploadImageToFirebase from './ipcHandle/upload/uploadImageToFirebase';

export const initialProcess = (mainWindow: BrowserWindow) => {
  const store = new Store();

  let photosDir: string =
    (store.get('photosDir') as string) ||
    path.join(app.getPath('documents'), 'photos');

  const uploadPath = path.join(photosDir, 'print');

  let isUploadDirExist = fs.existsSync(uploadPath);

  let isThumbDirExist = fs.existsSync(path.join(photosDir, 'thumbnails'));

  /* check photos folder exist */

  if (!fs.existsSync(photosDir)) {
    fs.mkdirSync(photosDir);
    store.set('photosDir', photosDir);
  }
  if (!isUploadDirExist) fs.mkdirSync(uploadPath);
  if (!isThumbDirExist) fs.mkdirSync(path.join(photosDir, 'thumbnails'));
  createThumbnail(mainWindow!, photosDir);
  uploadImageToFirebase();
};
